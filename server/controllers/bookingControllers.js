const { createClient } = require("@sanity/client");
require("dotenv").config();

const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2023-05-03",
});
const Booking = require("../model/booking");
const usersDB = require("../model/users");

const getAvailability = async (req, res) => {
  let { date, resources } = req.body;

  if (!date || !resources) {
    return res.status(400).json({ message: "Date and resources are required" });
  }

  // Convert DD-MM-YYYY to YYYY-MM-DD manually
  const [day, month, year] = date.split("-");
  const isoDate = `${year}-${month}-${day}`;
  date = isoDate; // Use standardized date for the rest of the function

  const requestedResources = resources.split(","); //resources is a string to convert to array

  // const allSlots = [
  //   "09:00 AM",
  //   "10:00 AM",
  //   "11:00 AM",
  //   "12:00 PM",
  //   "01:00 PM",
  //   "02:00 PM",
  //   "03:00 PM",
  //   "04:00 PM",
  //   "05:00 PM",
  //   "06:00 PM",
  // ];

  try {
    const dateObj = new Date(date);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dateObj.getDay()];
    // We ask Sanity: "Give me the activeSlots for the document where day is 'Monday'"
    const query = `*[_type == "timeSlots" && day == $day][0].activeSlots`;
    const params = { day: dayName };

    let allSlots = await writeClient.fetch(query, params);
    if (!allSlots) {
      allSlots = [];
    }

    const dateBookings = await Booking.find({ date: date });

    const blockedSlots = dateBookings
      .filter((booking) => {
        return booking.resources.some((r) => requestedResources.includes(r));
      })
      .map((b) => b.timeSlot);
    // NOTE FOR ME LATER:
    //.some returns true when at least one resource overlaps
    //ex: user requests ["Steam Room", "Sauna"]
    //a booking has resources ["Jacuzzi", "Sauna"]
    //.some will return true because "Sauna" is in both arrays
    //.include checks if resource r is in requestedResources
    //.map just collects the timeSlots of those conflicting bookings

    const availableSlots = allSlots.filter(
      (slot) => !blockedSlots.includes(slot),
    );

    res.json(availableSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBooking = async (req, res) => {
  let { service, date, timeSlot, resources } = req.body;

  if (!service || !date || !timeSlot || !resources) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Convert DD-MM-YYYY to YYYY-MM-DD manually
  const [day, month, year] = date.split("-");
  const isoDate = `${year}-${month}-${day}`;
  date = isoDate; // Use standardized date for storage and validation

  // Validate date is not in the past
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    return res.status(400).json({ message: "Cannot book dates in the past" });
  }

  // Validate date is not too far in the future (e.g., max 7 days)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  if (bookingDate > maxDate) {
    return res
      .status(400)
      .json({ message: "Cannot book more than 7 days in advance" });
  }

  // Sanitize and validate resources array
  if (!Array.isArray(resources) || resources.length === 0) {
    return res
      .status(400)
      .json({ message: "Resources must be a non-empty array" });
  }

  try {
    const user = await usersDB.findOne({ email: req.user });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check user's booking limit (prevent spam)
    const userBookingsToday = await Booking.countDocuments({
      user: user._id,
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      //mongo stores createdAt
    });

    if (userBookingsToday >= 5) {
      return res
        .status(429)
        .json({ message: "Daily booking limit reached (5 bookings per day)" });
    }

    // Use atomic operation to prevent race conditions
    const duplicate = await Booking.findOne({
      date,
      timeSlot,
      resources: { $in: resources }, // MongoDB operator to check overlap
    });

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Sorry, one of the facilities is already booked." });
    }

    // Create booking with user ID reference
    await Booking.create({
      user: user._id, // Use ObjectId instead of full user object
      service,
      date,
      timeSlot,
      resources,
    });

    res.status(201).json({ message: `Booking Confirmed for ${timeSlot}!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  const user = await usersDB.findOne({ email: req.user });
  try {
    const bookings = await Booking.find({ user: user }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "firstname lastname email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAvailability,
  createBooking,
  getMyBookings,
  getAllBookings,
};
