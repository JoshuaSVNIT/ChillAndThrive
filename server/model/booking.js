const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Confirmed",
    },
    resources: {
      type: [String], // Array of Strings
      required: true,
    },
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
