const request = require('supertest');

const url = "http://localhost:3000/submissions";

test('GET /submissions return 200 and a Submission object', async () => {
    const response = await request(url).get('/');

    expect(response.statusCode).toBe(200);
});

test('GET /submissions/id return 200 and a Submission object', async () => {
    const response = await request(url).get('/1');

    expect(response.statusCode).toBe(200);
});

test('POST /submissions return 201 Submission created', async () => {
    const response = await request(url).post('/').send({
        taskId: "5",
        userId: "6",
        answers: "answer"
    });

    expect(response.statusCode).toBe(201);
});

// Errors
test('GET /submissions/id wrong id return 404 Submission not found', async () => {
    const response = await request(url).get('/a');

    expect(response.statusCode).toBe(404);
});

test('POST /submissions with no parameters return 400 Bad request', async () => {
    const response = await request(url).post('/');

    expect(response.statusCode).toBe(400);
});

test('POST /submissions with one missing parameter return 400 Bad request', async () => {
    const response = await request(url).post('/').send({
        taskId: "1",
        // missing userId
        answers: "answer"
    });

    expect(response.statusCode).toBe(400);
});

test('POST /submissions already existing submission return 409 Submission already exists', async () => {
    const response = await request(url).post('/').send({
        taskId: "5",
        userId: "6",
        answers: "answer"
    });

    expect(response.statusCode).toBe(409);
});