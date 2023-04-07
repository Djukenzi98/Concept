const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

router.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

router.post("/users/new", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  });

  user.save();

  res.json(user);
});

module.exports = router;
