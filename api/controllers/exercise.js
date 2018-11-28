let exercises = [];

const ExerciseType = {
  TextBox: "Text box",
  RadioButton: "Radio button",
  CheckBox: "Check box",
  TrueOrFalse: "True or false",
}

function validExercise(exercise) {
  if (!exercise)
    return undefined;

  let name = exercise.name;
  let type = exercise.type;
  let question = exercise.question;
  let options = exercise.options;
  let valid;

  if (!name || !type || !question)
    return undefined;

  if (type != ExerciseType.TextBox && type != ExerciseType.CheckBox && type != ExerciseType.RadioButton && type != ExerciseType.TrueOrFalse) // exercise type not expected
    return undefined;

  if (type == ExerciseType.TextBox)
    valid = {
      name,
      type,
      question
    }
  else if (Array.isArray(options) && options.length >= 1)
    valid = {
      name,
      type,
      question,
      options
    };
  else
    return undefined;
  return valid;
}

function createExercise(exercise) {
  let newExercise = validExercise(exercise)

  if (!newExercise)
    return undefined;

  let id = Date.now(); //TODO: generate real id
  while (readExerciseById(id)) //Check if id alredy exist for another exercise
    id = Date.now();

  newExercise.id = id;
  newExercise.deleted = false;
  exercises.push(newExercise);

  return newExercise;
}

function readExerciseById(id) {
  return exercises.find(x => (x.id == id && !x.deleted));
}

function updateExercise(exercise) {
  let i = exercises.findIndex(x => (x.id == id && !x.deleted));
  let updated = validExercise(exercise);

  if (!exercises[i] || !updated)
    return undefined;

  updated.deleted = false;
  exercises[i] = updated;
  return exercises[i]
}

function deleteExercise(id) {
  let toDelete = readExerciseById(id);
  if (!toDelete)
    return undefined;
  toDelete.deleted = true;
  updateExercise(toDelete);
}

function readExecises() {
  return exercises.filter(x => !x.deleted).map(x => x.id);
}

module.exports = {
  createExercise,
  readExecises,
  readExerciseById,
  validExercise,
  updateExercise,
  deleteExercise,
  ExerciseType
};