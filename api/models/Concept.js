const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const Schema = mongoose.Schema;

const ConceptSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  example: { type: String },
  category: { type: String },
});

const Concept = mongoose.model("Concept", ConceptSchema);

router.get("/concepts", (req, res) => {
  Concept.find()
    .exec()
    .then((concepts) => res.json(concepts));
});

router.post("/concepts/new", (req, res) => {
  const concept = new Concept({
    title: req.body.title,
    description: req.body.description,
    example: req.body.example,
    category: req.body.category,
  });

  concept.save();

  res.json(concept);
});

router.delete("/concepts/delete/:id", (req, res) => {
  Concept.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedConcept) => {
      if (deletedConcept) {
        res.json(deletedConcept);
      } else {
        res.status(404).send(`No concept with id = ${req.params.id}`);
      }
    });
});

router.put("/concepts/edit", async (req, res) => {
  Concept.findById(req.body._id)
    .exec()
    .then((concept) => {
      if (concept) {
        if (req.body.title !== undefined) {
          concept.title = req.body.title;
        }
        if (req.body.description !== undefined) {
          concept.description = req.body.description;
        }

        concept.save();

        res.json(concept);
      } else {
        res.status(404).send(`No concept with id = ${req.body._id}`);
      }
    });
});

module.exports = router;
