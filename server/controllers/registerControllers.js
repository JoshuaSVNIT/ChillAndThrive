const { exec } = require("node:child_process");
const User = require("../model/users");

const bcrypt = require("bcrypt");

const handleNewuser = async (req, res) => {
  const { email, password, firstname, lastname, phoneNumber } = req.body;

  if (!email || !password || !phoneNumber || !firstname || !lastname)
    return res.status(400).json({ message: "All fields are required" });

  // // Validate phone number (must be exactly 10 digits)
  // const phoneRegex = /^\d{10}$/;
  // if (!phoneRegex.test(phoneNumber)) {
  //   return res
  //     .status(400)
  //     .json({ message: "Phone number must be exactly 10 digits" });
  // }

  const duplicate = await User.findOne({ email: email }).exec(); //documentation says that we have to put.exec() at the end when findOne used
  if (duplicate) return res.sendStatus(409); // 409 means "Conflict"

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      email: email,
      password: hashedPwd,
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
    });
    console.log(result);

    res.status(201).json({ message: `New User ${result.firstname} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewuser };
