const Booking = require("../model/booking");
const usersDB = require("../model/users");

const getAvailability = async (req, res) => {
  const { date, resources } = req.query;

  if (!date || !resources) {
    return res.status(400).json({ message: "Date and resources are required" });
  }

  const requestedResources = resources.split(","); //resources is a string to convert to array

  const allSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  try {
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
      (slot) => !blockedSlots.includes(slot)
    );

    res.json(availableSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBooking = async (req, res) => {
  const { service, date, timeSlot, resources } = req.body;

  if (!service || !date || !timeSlot || !resources) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
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

    const user = await usersDB.findOne({ email: req.user });
    // FIX 5: Save the resources!
    await Booking.create({
      user: user,
      service,
      date,
      timeSlot,
      resources, // <--- Crucial: Save this so we can block it later
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

module.exports = { getAvailability, createBooking, getMyBookings };
