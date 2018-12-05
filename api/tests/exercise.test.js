const exercise = require("../controllers/exercise");

////////   validExercise -> valid    ////////
test(
  "Valid Exercise - Valid Text Box", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.TextBox,
      question: "Which is your favourite colour?"
    };
    expect(exercise.validExercise(ex)).toEqual(ex);
  }
)

test(
  "Valid Exercise - Valid Check Box", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    expect(exercise.validExercise(ex)).toEqual(ex);
  }
)

////////   validExercise -> undefined    ////////
test(
  "Valid Exercise - undefined", () => {
    let ex = undefined;
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - {}", () => {
    let ex = {};
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - No Name", () => {
    let ex = {
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - No Type", () => {
    let ex = {
      name: "Es 1",
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - Wrong Type", () => {
    let ex = {
      name: "Es 1",
      type: "lalala",
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - No question", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      options: ["red", "green", "blue"]
    };
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - Check Box and no options", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
    };
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)

test(
  "Valid Exercise - Check Box and []", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: []
    };
    expect(exercise.validExercise(ex)).toBeUndefined();
  }
)