// const usersDB = require("../model/users");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const isProduction = process.env.NODE_ENV === "production";
// const handleLogin = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ message: "Email and password are required" });

//   const foundUser = await usersDB.findOne({ email: email }).exec();
//   if (!foundUser) return res.sendStatus(401);

//   const match = await bcrypt.compare(password, foundUser.password);

//   if (match) {
//     const roles = Object.values(foundUser.roles);

//     const accessToken = jwt.sign(
//       {
//         UserInfo: {
//           email: foundUser.email,
//           id: foundUser._id,
//           roles: roles,
//           firstname: foundUser.firstname,
//           lastname: foundUser.lastname,
//           phoneNumber: foundUser.phoneNumber,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "5m" },
//     );

//     const refreshToken = jwt.sign(
//       { email: foundUser.email },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "1d" },
//     );

//     foundUser.refreshToken = refreshToken;
//     const result = await foundUser.save();
//     console.log(result);

//     res.cookie("jwt", refreshToken, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: isProduction ? "None" : "Lax",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.json({
//       accessToken,
//       success: `User ${foundUser.firstname} is logged in!`,
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// module.exports = { handleLogin };

const usersDB = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const foundUser = await usersDB.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          id: foundUser._id,
          roles: roles,
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
          phoneNumber: foundUser.phoneNumber,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" },
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // 👇 UPDATED COOKIE SETTINGS
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: isProduction, // Match logic
      sameSite: isProduction ? "None" : "Lax", // Match logic
      maxAge: 24 * 60 * 60 * 1000,
      path: "/", // 👈 ADDED THIS
    });

    res.json({
      accessToken,
      success: `User ${foundUser.firstname} is logged in!`,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
