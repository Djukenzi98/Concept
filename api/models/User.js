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

// Get ALL users
router.get("/users", (req, res) => {
  User.find()
    .exec()
    .then((users) => res.json(users));
});

router.get("/users/id=:id", (req, res) => {
  User.findById(req.params.id)
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch(() => {
      res.status(404).send(`No user with id = ${req.params.id}`);
    });
});

// Get user by USERNAME and PASSWORD
router.get("/users/username=:username&password=:password", (req, res) => {
  User.findOne({
    username: req.params.username,
    password: req.params.password,
  })
    .exec()
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .send(
            `No user with username = ${req.params.username} and password = ${req.params.password}`
          );
      }
    });
});

// Add NEW user
router.post("/users/new", (req, res) => {
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
