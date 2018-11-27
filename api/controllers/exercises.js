const express = require('express');
//const exercise = require('exercise')

exports.exercises_get_all = (req, res) => {
   // res.json(exercise.readExecises());
  };

exports.exercises_get_singleExercise = (req, res) => {
    // let id = req.params.id;
    // let ex = exercise.readExerciseById(id);
    // if (ex)
    //   res.json(ex);
    // else
    //   res.status(404).send("Not found");
  };

exports.exercise_post_createExercise = (req, res) => {
    // let toCreate = req.body;
    // let created = exercise.createExercise(toCreate);
    // if(created)
    //   res.json(created);
    // else  
    //   res.status(403).send("Bad request"); //TODO: conforma a apiary
  };