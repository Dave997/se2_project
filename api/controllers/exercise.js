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

  let id = exercise.id;
  let name = exercise.name;
  let type = exercise.type;
  let question = exercise.question;
  let options = exercise.options;
  let valid;

  if (!name || !type || !question)
    return undefined;

  if(type == ExerciseType.TextBox && options)
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

  if(id)
    valid.id = id;

  return valid;
}

function cleanExercise(ex) {
  if (!validExercise(ex))
    return undefined;

  let tmp = {};
  for (let key in ex) {
    if (key != 'deleted')
      tmp[key] = ex[key];
  }
  return tmp;
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

  return cleanExercise(newExercise);
}

function readExerciseById(id) {
  let found =  exercises.find(x => (x.id == id && !x.deleted));
  if(!found)
    return undefined;
  else
    return found;
}

function updateExercise(id, newExercise) {
  let i = exercises.findIndex(x => (x.id == id && !x.deleted));
  if ( i < 0 )
    return undefined;

  for (let key in exercises[i]){
    if (!newExercise[key]) {
      newExercise[key] = exercises[i][key];
    }
  }

  newExercise = validExercise(newExercise);

  if (!newExercise)
    return undefined;

  exercises[i] = newExercise;

  return cleanExercise(exercises[i]);
}

function deleteExercise(id) {
  let toDelete = readExerciseById(id);
  if (!toDelete)
    return undefined;
  toDelete.deleted = true;
  updateExercise(toDelete);
  return true;
}

function readExecises() {
  return exercises.filter(x => !x.deleted).map(x => cleanExercise(x));
}

module.exports = {
  createExercise,
  cleanExercise,
  readExecises,
  readExerciseById,
  validExercise,
  updateExercise,
  deleteExercise,
  ExerciseType
};