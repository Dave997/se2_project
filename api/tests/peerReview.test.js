//to be put in api/tests

const request = require('supertest');
const url = require('../../app.js');

// ============================== PeerReviews - GET ==============================
test('GET /peerReviews return 200', async () => {
  const response = await request(url).get('/peerReviews');
  expect(response.statusCode).toBe(200);
});

test('GET /peerReviews filtered return 200', async () => {
  const response = await request(url).get('/peerReviews?userId=1');
  expect(response.statusCode).toBe(200);
});

test('GET /peerReviews return 400 wrong type', async () => {
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
});

test('GET /peerReviews should return list of peerReviews', async () => {
    const response = await request(url).get('/peerReviews');
    expect(response.statusCode).toBe(200);

    const peerReviews = response.body;

    expect(peerReviews).toBeDefined();
    expect(peerReviews[0]).toBeDefined();

    expect(typeof peerReviews[0].submissionId).toBe("number");
    expect(typeof peerReviews[0].userId).toBe("number");
    for (var i in peerReviews[0].answers)
    {
        expect(typeof i["excerciseId"]).toBe("number");
        expect(typeof i["value"]).toBe("string");
    }
});

  test('GET /peerReviews filtered should return list of peerReviews', async () => {
      const response = await request(url).get('/peerReviews?submissionId=2');
      expect(response.statusCode).toBe(200);

      const peerReviews = response.body;

      expect(peerReviews).toBeDefined();
      expect(peerReviews[0]).toBeDefined();

      expect(typeof peerReviews[0].submissionId).toBe("number");
      expect(typeof peerReviews[0].userId).toBe("number");
      for (var i in peerReviews[0].answers)
      {
          expect(typeof i["excerciseId"]).toBe("number");
          expect(typeof i["value"]).toBe("string");
      }
});

// ============================== peerReviews - POST ==============================
test('POST /peerReviews return 201', async () => {
  const response = await request(url)
    .post('/peerReviews')
    .send({
      url: url + '/peerReviews',
      httpMethod: 'post',
      expectedResultStatus: 201,
      payload: {
          submissionId: 1,
          userId: 1,
          answers: [[1, "test di polpetta"]]
      }
    })
    .set('Accept', 'application/json');

  expect(response.body.success).toBeDefined();
  expect(response.body.success).toBe(true);
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

  expect(response.body.success).toBeDefined();
  expect(response.body.success).toBe(true);
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

  expect(response.body.success).toBeDefined();
  expect(response.body.success).toBe(true);
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

  expect(response.body.success).toBeDefined();
  expect(response.body.success).toBe(true);
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

test('GET /peerReviews/:id should return the specified peerReview', async () => {
    const response = await request(url).get('/peerReviews/1');
    expect(response.statusCode).toBe(200);

    const peerReview = response.body;

    expect(peerReview).toBeDefined();

    expect(typeof peerReview.submissionId).toBe("number");
    expect(typeof peerReview.userId).toBe("number");
    for (var i in peerReview.answers)
    {
        expect(typeof i["excerciseId"]).toBe("number");
        expect(typeof i["value"]).toBe("string");
    }
});
