const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

// Collections
app.use(require("./models/Todo"));
app.use(require("./models/User"));

// Connecting to database
mongoose
  .connect("mongodb://localhost:27017/concept", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Concept DB"))
  .catch(console.error);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
