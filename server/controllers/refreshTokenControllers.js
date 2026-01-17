const usersDB = require("../model/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await usersDB
    .findOne({ refreshToken: refreshToken })
    .exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, Tokendata) => {
      // If token is expired or tampered with
      if (err || foundUser.email !== Tokendata.email)
        return res.sendStatus(403);

      // 4. Get Roles (Important for the new Access Token)
      const roles = Object.values(foundUser.roles);

      // 5. Create a NEW Access Token
      // WE MUST USE THE SAME "UserInfo" STRUCTURE AS LOGIN!
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: Tokendata.email,
            roles: roles,
            firstname: foundUser.firstname, // Adding this since you use it in frontend
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" } // CHANGE TO 5m later
      );

      // 6. Send the new Access Token to the frontend
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
