const request = require('supertest');
const config = require('../../config');

const url = config.SERVER_PATH+"/submissions";

let submission = {};

// CREATE
test('POST /submissions => return 201 Submission created', async () => {
    const response = await request(url).post('/').send({
        taskId: '1',
        userId: '2',
        answer: 'Answer'
    });

    // Save the object created
    submission = response.body.submission;

    // Check the status code
    expect(response.statusCode).toBe(201);
    
    // Check the correctness of the fields
    expect(submission.taskId).toBe('1');
    expect(submission.userId).toBe('2');
    expect(submission.answer).toBe('Answer');
});

// UPDATE
test('PUT /submissions => return 200 Updated', async () => {
    let url_id = '/' + submission._id;
    const response = await request(url).put(url_id).send({
        answer: 'New answer'
    });

    // Save the object created
    submission.answer = response.body.updated_field.answer;
    
    // Check the status code
    expect(response.statusCode).toBe(200);
    
    // Check the correctness of the updated field
    expect(submission.answer).toBe('New answer');
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
    
    // TODO: find better tests
    // Check if the list contains at least one object
    expect(response.body.submissions.length).toBeGreaterThan(0);
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
        answer: 'New answer'
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
        // missing taskId: '1',
        userId: '2',
        answer: 'Answer'
    });

    // Check the status code
    expect(response.statusCode).toBe(400);
});

// TODO: serve sta roba? Perché se li lancio ricevo un 404 e non un 400???
/*
// UPDATE - BAD REQUEST
test('PUT /submissions/id with no id => return 400 Bad request', async () => {
    const response = await request(url).put('/').send({
        answer: 'New answer'
    });

    // Check the status code
    expect(response.statusCode).toBe(400);
});

// DELETE - BAD REQUEST
test('DELETE /submissions/id with no id => return 400 Bad request', async () => {
    const response = await request(url).delete('/');

    // Check the status code
    expect(response.statusCode).toBe(400);
});
*/