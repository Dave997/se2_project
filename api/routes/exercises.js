const express = require('express');
const exercise = require('../controllers/exercise')

const router = express.Router();

router.get("/", (req, res) => {
  res.json(exercise.readExecises());
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let ex = exercise.readExerciseById(id);
  if (ex)
    res.json(ex);
  else
    res.status(404).send("Not found");
});

router.post("/", (req, res) => {
  let toCreate = req.body;
  let created = exercise.createExercise(toCreate);
  if (created)
    res.json(created);
  else
    res.status(403).send("Bad request");
});

module.exports = router;