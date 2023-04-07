const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: { type: String, required: true },
  complete: { type: Boolean, default: false },
  timestamp: { type: String, default: Date.now() },
});

const Todo = mongoose.model("Todo", TodoSchema);

router.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

router.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

router.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

router.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

module.exports = router;
