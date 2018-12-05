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
    res.status(400).send("Bad request");
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let toUpdate = req.body;
  if(!id || !toUpdate) {
    res.status(400);
    res.send("Bad requuest");
  }
  let updated = exercise.updateExercise(id, toUpdate);
  if(!updated){
    res.sendStatus(404);
  } else{
    res.json(updated);
  }
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  if (!id){
    res.sendStatus(400);
  }

  let deleted = exercise.deleteExercise(id);
  if(!deleted)
    res.status(404).send("Not found");
  else
    res.sendStatus(200);
});

module.exports = router;