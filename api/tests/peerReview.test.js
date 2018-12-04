const request = require('supertest');
//const url = require('../../app.js');
const url = 'http://localhost:3000';
const mongoose = require("mongoose");


let temp_id1;
let temp_id2;

// inizialize db
test('POST /peerReviews return 201', async () => {
    const response = await request(url).post('/peerReviews').send({
        submissionId: 1,
        userId: 1,
        answers: [{"exerciseId":1, "value":"polpetta"}]
    });

    expect(response.statusCode).toBe(201);
});

test('POST /peerReviews return 201', async () => {
    const response = await request(url).post('/peerReviews').send({
        submissionId: 2,
        userId: 2,
        answers: [{"exerciseId":2, "value":"aronne"}]
    });

    expect(response.statusCode).toBe(201);
});


// ============================== PeerReviews - GET ==============================
test('GET /peerReviews return 200', async () => {
    const response = await request(url).get('/peerReviews');
    temp_id1 = response.body.result[0]._id;
    console.log(temp_id1);
    temp_id2 = response.body.result[1]._id;
    console.log(temp_id2);
    expect(response.statusCode).toBe(200);
});

/*test('GET /peerReviews filtered return 200', async () => {
    const response = await request(url).get('/peerReviews?userId=1');
    expect(response.statusCode).toBe(200);
});

/*test('GET /peerReviews return 400 wrong type', async () => {
const response = await request(url).get('/peerReviews?submissionId=hello');
expect(response.statusCode).toBe(400);
});

test('GET /peerReviews return 401 wrong filter', async () => {
const response = await request(url).get('/peerReviews?blaBlaBla=hello');
expect(response.statusCode).toBe(401);
});

test('GET /peerReviews return 404', async () => {
const response = await request(url).get('/peerReviews?userId=999999999');
expect(response.statusCode).toBe(404);
});

test('GET /peerReviews return 404', async () => {
const response = await request(url).get('/peerReviews?submissionId=999999999');
expect(response.statusCode).toBe(404);
});*/

// ============================== peerReviews - POST ==============================
test('POST /peerReviews return 400', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        submissionId: "potato",
        userId: 1,
        answers: [[1, "test di polpetta"]]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('POST /peerReviews return 400', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        submissionId: 1,
        userId: "potato",
        answers: [[1, "test di polpetta"]]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('POST /peerReviews return 400', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        submissionId: 1,
        userId: 1,
        answers: [{exerciseId:"aronne", value:"test di polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});


// ============================== PeerReviews/:id - GET ========================

test('GET /peerReviews/:id return 200 ', async () => {
    const response = await request(url).get('/peerReviews/' + temp_id1);
    expect(response.statusCode).toBe(200);
});

test('GET /peerReviews/:id return 200', async () => {
    const response = await request(url).get('/peerReviews/' + temp_id2);
    expect(response.statusCode).toBe(200);
});

test('GET /peerReviews/:id return 400', async () => {
    const response = await request(url).get('/peerReviews/5');
    expect(response.statusCode).toBe(400);
});

test('GET /peerReviews/:id return 404', async () => {
    const response = await request(url).get('/peerReviews/5bfec803124054189263178a');
    expect(response.statusCode).toBe(404);
});


// ============================== peerReviews - PUT ============================
test('PUT /peerReviews/:id return 200 without updating', async () => {
    const response = await request(url)
    .put('/peerReviews/' + temp_id1)
    .send({
        submissionId: 1,
        userId: 1,
        answers: [{"exerciseId":1, "value":"polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);

});

test('PUT /peerReviews/:id return 200 updating', async () => {
    const response = await request(url)
    .put('/peerReviews/' + temp_id2)
    .send({
        "submissionId": 222,
        "userId": 222,
        "answers": [{"exerciseId":222, "value":"maronn"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);

});

test('PUT /peerReviews/:id return 400 invalid param1', async () => {
    const response = await request(url)
    .put('/peerReviews/' + temp_id2)
    .send({
        submissionId: "potato",
        userId: 2,
        answers: [{"exerciseId":2, "value":"test di polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('PUT /peerReviews return 400 invalid param2', async () => {
    const response = await request(url)
    .put('/peerReviews/' + temp_id2)
    .send({
        submissionId: 1,
        userId: "potato",
        answers: [{"exerciseId":2, "value":"test di polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('PUT /peerReviews return 400 invalid id', async () => {
    const response = await request(url)
    .put('/peerReviews/sadasdasd')
    .send({
        submissionId: 1,
        userId: 1,
        answers: [{"exerciseId":2, "value":"test di polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('PUT /peerReviews return 400 invalid array', async () => {
    const response = await request(url)
    .put('/peerReviews/' + temp_id2)
    .send({
        submissionId: 1,
        userId: 1,
        answers: [[2, "test di polpetta"]]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('PUT /peerReviews return 404', async () => {
    const response = await request(url)
    .put('/peerReviews/' + '5bfec803124054189263178a')
    .send({
        submissionId: 1,
        userId: 1,
        answers: [{"exerciseId":2, "value":"test di polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(404);
});


// ============================== PeerReviews/:id - DELETE =====================
test('DELETE /peerReviews/:id return 200', async () => {
    const response = await request(url).delete('/peerReviews/' + temp_id2);
    expect(response.statusCode).toBe(200);
});

test('DELETE /peerReviews/:id return 400 wrong type', async () => {
    const response = await request(url).delete('/peerReviews/hello');
    expect(response.statusCode).toBe(400);
});

test('DELETE /peerReviews/:id return 404', async () => {
    const response = await request(url).delete('/peerReviews/' + temp_id2);
    expect(response.statusCode).toBe(404);
});
