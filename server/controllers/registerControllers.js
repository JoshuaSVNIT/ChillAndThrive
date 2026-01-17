const { exec } = require("node:child_process");
const User = require("../model/users");

const bcrypt = require("bcrypt");

const handleNewuser = async (req, res) => {
  const { email, password, firstname, lastname, phoneNumber } = req.body;

  // 1. Check for empty fields
  if (!email || !password || !phoneNumber || !firstname || !lastname)
    return res.status(400).json({ message: "All fields are required" });

  // 2. CHECK FOR DUPLICATES (Crash 2 fixed)
  const duplicate = await User.findOne({ email: email }).exec(); //documentation says that we have to put.exec() at the end when findOne used
  if (duplicate) return res.sendStatus(409); // 409 means "Conflict"

  try {
    // 3. Encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);

    // 4. Create the new user object
    // FIXED: Changed variable name from 'users' to 'newUser' to match below
    const result = await User.create({
      email: email,
      password: hashedPwd,
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
    });
    console.log(result);
    // 5. Update the "Database"

    res.status(201).json({ message: `New User ${result.firstname} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewuser };
