const express = require('express');

const router = express.Router();

const Exercisecontroller = require("../controllers/exercises");

router.get("/", Exercisecontroller.exercises_get_all);

router.get("/:id", Exercisecontroller.exercises_get_singleExercise);

router.post("/", Exercisecontroller.exercise_post_createExercise);

module.exports = router;