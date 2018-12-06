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
// cleanExercise
test(
  "clean Exercise - ok", () => {
    let dirty = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ['la', 'la', 'la'],
      deleted: false
    };
    let clean = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ['la', 'la', 'la'],
    };
    expect(exercise.cleanExercise(dirty)).toEqual(clean);
  }
)
test(
  "clean Exercise - already clean", () => {
    let clean = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ['la', 'la', 'la'],
    };
    expect(exercise.cleanExercise(clean)).toEqual(clean);
  }
)
test(
  "clean Exercise - not valid exercise", () => {
    let dirty = {
      strange: "field",
      deleted: false
    };
    expect(exercise.cleanExercise(dirty)).toBeUndefined();
  }
)

// createExercise
test(
  "createExercise - Valid Exercise", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.TextBox,
      question: "Which is your favourite colour?"
    };
    let response = exercise.createExercise(ex);

    expect(response.id).not.toBeUndefined();

    ex.id = response.id; //
    expect(response).toEqual(ex);
  }
)

test(
  "createExercise - Not Valid Exercise", () => {
    let ex = {
      type: exercise.ExerciseType.TextBox,
      question: "Which is your favourite colour?"
    };
    let response = exercise.createExercise(ex);

    expect(response).toBeUndefined();
  }
)

test(
  "createExercise and update name - Valid Exercise", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    let created = exercise.createExercise(ex);
    let newName = "Es 2";

    let updated = exercise.updateExercise(created.id, {
      name: newName
    });

    created.name = newName;

    expect(exercise.readExerciseById(created.id)).toEqual(created);
  }
)


test(
  "createExercise and update type - Not Valid Exercise", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    let created = exercise.createExercise(ex);

    let updated = exercise.updateExercise(created.id, {
      type: exercise.ExerciseType.TextBox //it has no options      
    });

    expect(updated).toBeUndefined();
  }
)

test(
  "createExercise and delete - Valid Exercise", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    let created = exercise.createExercise(ex);
    let id = created.id;

    let deleted = exercise.deleteExercise(id)
    expect(deleted).toEqual(true);
    expect(exercise.readExerciseById(id)).toBeUndefined();
  }
)

test(
  "createExercise and delete delete - Valid Exercise", () => {
    let ex = {
      name: "Es 1",
      type: exercise.ExerciseType.CheckBox,
      question: "Which is your favourite colour?",
      options: ["red", "green", "blue"]
    };
    let created = exercise.createExercise(ex);
    let id = created.id;
    let deleted = exercise.deleteExercise(id)
    
    expect(deleted).toEqual(true);
    expect(exercise.readExerciseById(id)).toBeUndefined();

    deleted = exercise.deleteExercise(id)
    expect(deleted).toBeUndefined();


  }
)