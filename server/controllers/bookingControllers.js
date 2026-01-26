const { createClient } = require("@sanity/client");
const crypto = require("crypto"); // 👈 Added for signature verification
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

// ---------------------------------------------------------
// 1. GET AVAILABILITY
// ---------------------------------------------------------
const getAvailability = async (req, res) => {
  // 1. LOG THE INCOMING REQUEST
  console.log("🔍 Availability Request Received:", req.body);

  const { date, resources } = req.body;

  if (!date || !resources) {
    console.error("❌ Missing Data:", { date, resources });
    return res.status(400).json({ message: "Date and resources are required" });
  }

  // 2. SAFE RESOURCE PARSING (Prevents Crash)
  let requestedResources = [];
  if (Array.isArray(resources)) {
    requestedResources = resources;
  } else if (typeof resources === "string") {
    requestedResources = resources.split(",");
  } else {
    console.error("❌ Invalid Resources Format:", typeof resources);
    return res.status(400).json({ message: "Invalid resources format" });
  }

  try {
    // 3. FIX TIMEZONE BUG (Force correct Day Name)
    const dateObj = new Date(date + "T00:00:00");

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

    console.log(
      `📅 Date: ${date} | Day: ${dayName} | Resources: ${requestedResources}`,
    );

    // 4. SANITY QUERY
    const query = `*[_type == "timeSlots" && day == $day][0].activeSlots`;
    const params = { day: dayName };

    console.log("📡 Fetching from Sanity...");
    let allSlots = await writeClient.fetch(query, params);

    if (!allSlots) {
      console.warn(
        `⚠️ No slots found in Sanity for ${dayName}. Returning empty array.`,
      );
      allSlots = [];
    } else {
      console.log(`✅ Sanity returned ${allSlots.length} slots.`);
    }

    // 5. MONGODB QUERY
    console.log("📡 Fetching existing bookings from MongoDB...");
    const dateBookings = await Booking.find({ date: date });
    console.log(`found ${dateBookings.length} bookings for this date.`);

    // 6. CALCULATE BLOCKED SLOTS
    const blockedSlots = dateBookings
      .filter((booking) => {
        const bookingRes = booking.resources || [];
        return bookingRes.some((r) => requestedResources.includes(r));
      })
      .map((b) => b.timeSlot);

    console.log("🚫 Blocked Slots:", blockedSlots);

    // 7. CALCULATE AVAILABLE
    const availableSlots = allSlots.filter(
      (slot) => !blockedSlots.includes(slot),
    );

    console.log("✅ Sending Available:", availableSlots);
    res.json(availableSlots);
  } catch (err) {
    console.error("🔥 CRITICAL ERROR in getAvailability:", err);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
};

// ---------------------------------------------------------
// 2. CREATE BOOKING (Updated with Razorpay Logic)
// ---------------------------------------------------------
const createBooking = async (req, res) => {
  const {
    service,
    date,
    timeSlot,
    resources,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!service || !date || !timeSlot || !resources) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // -------------------------------------------------------
  // 🔐 RAZORPAY VERIFICATION (Fixed Security)
  // -------------------------------------------------------
  if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        message: "Payment verification failed. Please contact support.",
      });
    }
  } else {
    // 🚨 SECURITY FIX: We now REJECT bookings without payment
    return res
      .status(400)
      .json({ message: "Payment details are missing. Booking denied." });
  }
  // -------------------------------------------------------

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
      paymentId: razorpay_payment_id || null, // 👈 Save Payment ID if it exists
    });

    res.status(201).json({ message: `Booking Confirmed for ${timeSlot}!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------------------------------------
// 3. GET MY BOOKINGS (Unchanged)
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// 4. GET ALL BOOKINGS (Unchanged)
// ---------------------------------------------------------
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
