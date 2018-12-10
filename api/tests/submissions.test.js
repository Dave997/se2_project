const request = require('supertest');
const config = require('../../config');

const url = config.SERVER_PATH+"/submissions";

let submission = {};

// CREATE
test('POST /submissions => return 201 Submission created', async () => {
    const response = await request(url).post('/').send({
        taskId: '1',
        userId: '2',
        answers: [{
            exerciseId: 1,
            value: "Answer"
        }]
    });

    // Save the object created
    submission = response.body.submission;

    // Check the status code
    expect(response.statusCode).toBe(201);

    // Check the correctness of the fields
    expect(submission.taskId).toBe('1');
    expect(submission.userId).toBe('2');

    expect(submission.answers).toEqual([{
        exerciseId: 1,
        value: "Answer"
    }]);
});

// UPDATE
test('PUT /submissions => return 200 Updated', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).put(url_id).send({
        answers: [{
            exerciseId: 1,
            value: "New answer"
        }]
    });

    // Save the object created
    submission.answers = response.body.updated_field.answers;

    // Check the status code
    expect(response.statusCode).toBe(200);

    // Check the correctness of the updated field
    expect(submission.answers).toEqual([{
        exerciseId: 1,
        value: "New answer"
    }]);
});

// GET ID
test('GET /submissions/id => return 200 and a Submission object', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).get(url_id);

    // Check the status code
    expect(response.statusCode).toBe(200);

    // Check if the returned object is equals to the local object
    expect(response.body.submission).toEqual(submission);
});

// GET ALL
test('GET /submissions => return 200 and a Submission object', async () => {
    const response = await request(url).get('/');

    // Check the status code
    expect(response.statusCode).toBe(200);

    // Check if the list contains at least one object
    expect(response.body.submissions.length).toBeGreaterThan(0);
});

// UPDATE - BAD REQUEST
test('PUT /submissions/id with bad parameter=> return 400 Bad request', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).put(url_id).send({
        answers: [{
            exerciseId: "Hey", // Should be a number
            value: "New answer"
        }]
    });

    // Check the status code
    expect(response.statusCode).toBe(400);
});

// CREATE - BAD REQUEST
test('POST /submissions/id with bad parameter=> return 400 Bad request', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).put(url_id).send({
        answers: [{
            exerciseId: "Hey", // Should be a number
            value: "New answer"
        }]
    });

    // Check the status code
    expect(response.statusCode).toBe(400);
});

// DELETE
test('DELETE /submissions/id => return 200 OK', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).delete(url_id);

    // Check the status code
    expect(response.statusCode).toBe(200);
});

// GET ID - NOT FOUND
test('GET /submissions/id with the id of a deleted submission => return 404 Not found', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).get(url_id);

    // Check the status code
    expect(response.statusCode).toBe(404);
});

// UPDATE - NOT FOUND
test('PUT /submissions/id with the id of a deleted submission => return 404 Not found', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).put(url_id).send({
        answers: [{
            exerciseId: 1,
            value: "New answer"
        }]
    });

    // Check the status code
    expect(response.statusCode).toBe(404);
});

// DELETE - NOT FOUND
test('DELETE /submissions/id with the id of a deleted submission => return 404 Not found', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).delete(url_id);

    // Check the status code
    expect(response.statusCode).toBe(404);
});

// CREATE - BAD REQUEST
test('POST /submissions with one missing parameter => return 400 Bad request', async () => {
    const response = await request(url).post('/').send({
        // missing taskId: 1,
        userId: 1,
        answers: [{
            exerciseId: 1,
            value: "Answer"
        }]
    });

    // Check the status code
    expect(response.statusCode).toBe(400);
});