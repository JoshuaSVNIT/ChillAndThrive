// const usersDB = require("../model/users");
// const jwt = require("jsonwebtoken"); //actually not needed
// require("dotenv").config();
// const isProduction = process.env.NODE_ENV === "production";

// const handleLogout = async (req, res) => {
//   const cookies = req.cookies;
//   // 👇 Add this log!
//   console.log("Logout Request Cookies:", cookies);

//   if (!cookies?.jwt) return res.sendStatus(204);
//   console.log(cookies.jwt);
//   const refreshToken = cookies.jwt;

//   const foundUser = await usersDB
//     .findOne({ refreshToken: refreshToken })
//     .exec();
//   if (foundUser) {
//     foundUser.refreshToken = "";
//     const result = await foundUser.save();
//     console.log(result);
//   }

//   res.clearCookie("jwt", {
//     httpOnly: true,
//     secure: isProduction,
//     sameSite: isProduction ? "None" : "Lax",
//   });
//   // newer browser protocols require you to specify the EXACT same things you mentioned while making the cookie other request is ignored
//   res.sendStatus(204);
// };

// module.exports = { handleLogout };

const usersDB = require("../model/users");
require("dotenv").config();

// 👇 RESTORE THIS CONSTANT
const isProduction = process.env.NODE_ENV === "production";

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  console.log("Logout Request Cookies:", cookies);

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  // 1. Clear DB Token
  const foundUser = await usersDB
    .findOne({ refreshToken: refreshToken })
    .exec();

  if (foundUser) {
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log("DB Token Cleared:", result);
  }

  // 2. Clear Browser Cookie
  // 👇 UPDATED TO EXACTLY MATCH LOGIN
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction, // 👈 Restored dynamic logic
    sameSite: isProduction ? "None" : "Lax", // 👈 Restored dynamic logic
    path: "/", // 👈 Matches Login path
  });

  res.sendStatus(204);
};

module.exports = { handleLogout };
