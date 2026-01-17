const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // 1. Personal Details
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  // 2. The New "ID" (Login Key)
  email: {
    type: String,
    required: true,
    unique: true, // IMPORTANT: No two users can have the same email
  },

  // 3. Contact
  phoneNumber: {
    type: String,
    required: true,
  },

  // 4. Security
  password: {
    type: String,
    required: true,
  },

  // 5. Roles
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
