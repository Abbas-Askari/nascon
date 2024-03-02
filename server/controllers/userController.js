const User = require("../models/userModel");

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  res.json({ users });
}

async function getUser(req, res) {
  const { userID } = req.params

  const user = await User.findById(userID).exec()

  if (!user) {
    return res.json({error: "No Such User Found"})
  }

  return res.json({user})
}

module.exports = { getAllUsers, getUser };
