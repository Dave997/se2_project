const supertest = require("supertest");
const exercises = require("../controllers/exercise");

const PORT = process.env.PORT || 3000
const url = "http://localhost:" + PORT;

test('GET /exercises return 200', async () => {
  const res = await supertest(url).get("/exercises");
  expect(res.statusCode).toBe(200);
});

test('GET /exercises/0 return 404', async () => {
  const res = await supertest(url).get("/exercises/0");
  expect(res.statusCode).toBe(404);
});

test('POST /exercises return 200', async () => {
  let ex = {
    name: "Es 1",
    type: exercises.ExerciseType.TextBox,
    question: "Which is your favourite colour?"
  };
  const res = await supertest(url).post("/exercises").send(ex);
  expect(res.statusCode).toBe(200);
});

test('POST /exercises return 400, exercise with no name', async () => {
  let ex = {
    type: exercises.ExerciseType.TextBox,
    question: "Which is your favourite colour?"
  };
  const res = await supertest(url).post("/exercises").send(ex);
  expect(res.statusCode).toBe(400);
});

test('POST /exercises return 400, exercise check box with no options', async () => {
  let ex = {
    name: "Es 1",
    type: exercises.ExerciseType.CheckBox,
    question: "Which is your favourite colour?"
  };
  const res = await supertest(url).post("/exercises").send(ex);
  expect(res.statusCode).toBe(400);
});

test('GET /exercises/id return 200 valid', async () => {
  let all = exercises.readExecises();
  if (all.length > 0) {
    let id = all[0].id;
    if (id) {
      let res = await supertest(url).get(`/exercises/${id}`);
      expect(res.statusCode).toBe(200);
    }
  }
});

test('GET /exercises/id return 404 not found', async () => {
  let res = await supertest(url).get(`/exercises/not-exist`);
  expect(res.statusCode).toBe(404);
});


test('PUT /exercises/id return 200 valid', async () => {

  let ex = {
    name: "Es 1",
    type: exercises.ExerciseType.TextBox,
    question: "Which is your favourite colour?"
  };
  let res = await supertest(url).post("/exercises").send(ex);
  expect(res.statusCode).toBe(200);

  let id = res.body.id;
  let body = {
    name: "Modified Exercise"
  };
  if (id) {
    let res = await supertest(url).put(`/exercises/${id}`).send(body);
    expect(res.body.name).toBe(body.name);
    expect(res.statusCode).toBe(200);
  }
});

test('DELETE /exercises/id return 200 valid', async () => {

  let ex = {
    name: "Es 1",
    type: exercises.ExerciseType.TextBox,
    question: "Which is your favourite colour?"
  };
  let res = await supertest(url).post("/exercises").send(ex);
  expect(res.statusCode).toBe(200);

  let id = res.body.id;

  if (id) {
    res = await supertest(url).delete(`/exercises/${id}`);
    expect(res.statusCode).toBe(200);

    res = await supertest(url).get(`/exercises/${id}`);
    expect(res.statusCode).toBe(404);
  }
});