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
  const { date, resources } = req.body; // <--- REMOVED 'let', simplified destructuring

  if (!date || !resources) {
    return res.status(400).json({ message: "Date and resources are required" });
  }

  // ❌ DELETED: Manual Date Conversion Block
  // The frontend <input type="date"> already sends "YYYY-MM-DD",
  // so we use 'date' directly.

  const requestedResources = resources.split(",");

  try {
    const dateObj = new Date(date); // Works perfectly with YYYY-MM-DD
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

    // Sanity Query
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

    const availableSlots = allSlots.filter(
      (slot) => !blockedSlots.includes(slot),
    );

    res.json(availableSlots);
  } catch (err) {
    console.error("Availability Error:", err); // Added log for easier debugging
    res.status(500).json({ message: err.message });
  }
};

const createBooking = async (req, res) => {
  const { service, date, timeSlot, resources } = req.body; // <--- REMOVED 'let'

  if (!service || !date || !timeSlot || !resources) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // ❌ DELETED: Manual Date Conversion Block here too

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

    // Check user's booking limit
    const userBookingsToday = await Booking.countDocuments({
      user: user._id,
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    if (userBookingsToday >= 5) {
      return res
        .status(429)
        .json({ message: "Daily booking limit reached (5 bookings per day)" });
    }

    // Check for duplicates
    const duplicate = await Booking.findOne({
      date,
      timeSlot,
      resources: { $in: resources },
    });

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Sorry, one of the facilities is already booked." });
    }

    // Create booking
    await Booking.create({
      user: user._id,
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
