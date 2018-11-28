const request = require('supertest');
//const url = require('../../app.js');
const url = 'http://localhost:3000';

// ============================== PeerReviews - GET ==============================
test('GET /peerReviews return 200', async () => {
    const response = await request(url).get('/peerReviews');
    expect(response.statusCode).toBe(200);
});

test('GET /peerReviews filtered return 200', async () => {
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
test('POST /peerReviews return 201', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        "submissionId": 4,
        "userId": 4,
        "answers": [{"exerciseId":4, "value":"test di polpetta"}]
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);

});

test('POST /peerReviews return 400', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        url: url + '/peerReviews',
        httpMethod: 'post',
        expectedResultStatus: 400,
        payload: {
            submissionId: "potato",
            userId: 1,
            answers: [[1, "test di polpetta"]]
        }
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('POST /peerReviews return 400', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        url: url + '/peerReviews',
        httpMethod: 'post',
        expectedResultStatus: 400,
        payload: {
            submissionId: 1,
            userId: "potato",
            answers: [[1, "test di polpetta"]]
        }
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});

test('POST /peerReviews return 400', async () => {
    const response = await request(url)
    .post('/peerReviews')
    .send({
        url: url + '/peerReviews',
        httpMethod: 'post',
        expectedResultStatus: 400,
        payload: {
            submissionId: 1,
            userId: 1,
            answers: [["aronne", "test di polpetta"]]
        }
    })
    .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
});


// ============================== PeerReviews/:id - GET ==============================
test('GET /peerReviews/:id return 200', async () => {
    const response = await request(url).get('/peerReviews/1');
    expect(response.statusCode).toBe(200);
});

test('GET /peerReviews/:id return 400 wrong type', async () => {
    const response = await request(url).get('/peerReviews/hello');
    expect(response.statusCode).toBe(400);
});

test('GET /peerReviews/:id return 404', async () => {
    const response = await request(url).get('/peerReviews/999999999');
    expect(response.statusCode).toBe(404);
});
