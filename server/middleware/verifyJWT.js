const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //note: just checking capital and small a

  // Check if header exists and starts with "Bearer "
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  //Grab token (remove word "Bearer ")
  const token = authHeader.split(" ")[1];

  //Verifying the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //forbidden (Invalid Token)

    req.user = decoded.UserInfo.email; //JS creates property user
    req.id = decoded.UserInfo.id; //JS creates property id
    req.id = decoded.UserInfo.id; //JS creates property id
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
