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