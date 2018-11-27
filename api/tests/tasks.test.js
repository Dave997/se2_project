const request = require('supertest');
const url = require('../../app.js');



// ============================== Tasks - GET ==============================
test('GET /tasks return 200', async () => {
    const response = await request(url).get('/tasks');
    expect(response.statusCode).toBe(200);
});

test('GET /tasks filtered return 200', async () => {
    const response = await request(url).get('/tasks?minNumberOfExercises=0');
    expect(response.statusCode).toBe(200);
});

test('GET /tasks return 400 wrong type', async () => {
    const response = await request(url).get('/tasks?minNumberOfExercises=hello');
    expect(response.statusCode).toBe(400);
});

test('GET /tasks return 400 wrong filter', async () => {
    const response = await request(url).get('/tasks?notExistingFilter=hello');
    expect(response.statusCode).toBe(400);
});

test('GET /tasks return 404', async () => {
    const response = await request(url).get('/tasks?minNumberOfExercises=999999999');
    expect(response.statusCode).toBe(404);
});

test('GET /tasks should return list of tasks', async () => {
    const response = await request(url).get('/tasks');
    expect(response.statusCode).toBe(200);

    const tasks = response.body;

    expect(tasks).toBeDefined();
    expect(tasks[0]).toBeDefined();

    expect(typeof tasks[0].id).toBe("number");
    for (var i = 0; i < tasks[0].exercises.lenght; i++)
    {
        expect(typeof task[0].exercises[i]).toBe("number");
    }
});

test('GET /tasks filtered should return list of tasks', async () => {
    const response = await request(url).get('/tasks?minNumberOfExercises=0');
    expect(response.statusCode).toBe(200);

    const tasks = response.body;

    expect(tasks).toBeDefined();
    expect(tasks[0]).toBeDefined();

    expect(typeof tasks[0].id).toBe("number");
    for (var i = 0; i < tasks[0].exercises.lenght; i++)
    {
        expect(typeof task[0].exercises[i]).toBe("number");
    }
});





// ============================== Tasks - POST ==============================
test('POST /tasks return 201', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Testing task",
        exercises:[0,1,2]}
    );

    expect(response.statusCode).toBe(201);
});

test('POST /tasks return 400', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Testing task",
        exercises: 0
    });

    expect(response.statusCode).toBe(400);
});

// unauthorized, we will need the token system
// test('POST /tasks return 401', async () => {
//   const response = await request(url)
//     .post('/tasks')
//     .send({
//       url: url + '/tasks',
//       httpMethod: 'post',
//       expectedResultStatus: 201,
//       payload: {
//           name: "Testing task",
//           exercises: [0,1,2]
//       }
//     })
//     .set('Accept', 'application/json');
//
//   expect(response.body.success).toBeDefined();
//   expect(response.body.success).toBe(true);
// });






// ============================== Tasks/:id - GET ==============================
test('GET /tasks/:id return 200', async () => {
    const response = await request(url).get('/tasks/1');
    expect(response.statusCode).toBe(200);
});

test('GET /tasks/:id return 400', async () => {
    const response = await request(url).get('/tasks/hello');
    expect(response.statusCode).toBe(400);
});

test('GET /tasks return 404', async () => {
    const response = await request(url).get('/tasks/999999999');
    expect(response.statusCode).toBe(404);
});

test('GET /tasks/:id should return the specified tasks', async () => {
    const response = await request(url).get('/tasks/1');
    expect(response.statusCode).toBe(200);

    const task = response.body;

    expect(task).toBeDefined();

    expect(typeof task.id).toBe("number");
    expect(typeof task.name).toBe("string");
    // come ciclare su exercises? È un object di cui non conosciamo la dimensione
});
