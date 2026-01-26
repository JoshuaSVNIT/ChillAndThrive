const usersDB = require("../model/users");

//-------------------------------------------------------------
const getAllUsers = async (req, res) => {
  const allUsers = await usersDB.find().select("-password").exec();

  if (!allUsers)
    return res.status(204).json({ message: "No users were found" });
  res.json(allUsers);
};
//-------------------------------------------------------------
const deleteUser = async (req, res) => {
  if (!req.body.id)
    return res.status(400).json({ message: "User id is required" });

  const user = await usersDB.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches the Id you provided: ${req.body.id}` });
  }

  const result = await usersDB.deleteOne({ _id: req.body.id });
  res.json(result);
};

//-------------------------------------------------------------
const getUser = async (req, res) => {
  if (!req.body.id)
    return res.status(400).json({ message: "User id is required" });

  const user = await usersDB.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches the Id you provided: ${req.body.id}` });
  }

  res.json(user);
};
const myProfile = async (req, res) => {
  if (!req.user)
    return res.status(400).json({ message: "Invalid Token: User ID missing" });

  const user = await usersDB
    .findOne({ email: req.user })
    .select("-password")
    .exec();

  if (!user) {
    return res.status(204).json({ message: "User not found" });
  }

  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  myProfile,
};
