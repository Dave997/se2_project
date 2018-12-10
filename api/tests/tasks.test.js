const request = require('supertest');
const mongoose = require("mongoose");

const config = require('../../config');
const url = config.SERVER_PATH;

let temp_id;

// inizialize db.
// NB: the two last entries in the DB will be FirstTask and SecondTask
// for this reason I will use tasks[tasks.length-1] and tasks[tasks.length-2]
test('POST /tasks return 201', async () => {
    const response = await request(url).post('/tasks').send({
        name: "FirstTask",
        exercises:[1,2,5]}
    );

    expect(response.statusCode).toBe(201);
});

test('POST /tasks return 201', async () => {
    const response = await request(url).post('/tasks').send({
        name: "SecondTask",
        exercises:[2,4,5,6,7]}
    );

    expect(response.statusCode).toBe(201);
});



// ============================== Tasks - GET ==============================
test('GET /tasks return 200', async () => {
    const response = await request(url).get('/tasks');
    expect(response.statusCode).toBe(200);
});

test('GET /tasks filtered return 200', async () => {
    const response = await request(url).get('/tasks?name=FirstTask');
    expect(response.statusCode).toBe(200);
});

test('GET /tasks return 400 wrong type', async () => {
    const response = await request(url).get('/tasks?name=123');
    expect(response.statusCode).toBe(400);
});

test('GET /tasks return 404', async () => {
    const response = await request(url).get('/tasks?name=Qwerty');
    expect(response.statusCode).toBe(404);
});

test('GET /tasks should return list of tasks', async () => {
    const response = await request(url).get('/tasks');
    expect(response.statusCode).toBe(200);

    const tasks = response.body.result;

    expect(tasks).toBeDefined();
    expect(tasks[tasks.length-1]).toBeDefined();
    expect(tasks[tasks.length-2]).toBeDefined();
    temp_id = tasks[tasks.length-2]._id;


    expect(tasks[tasks.length-2].name).toBe("FirstTask");
    expect(tasks[tasks.length-2].exercises[0]).toBe(1);
    expect(tasks[tasks.length-2].exercises[1]).toBe(2);
    expect(tasks[tasks.length-2].exercises[2]).toBe(5);

    expect(tasks[tasks.length-1].name).toBe("SecondTask");
    expect(tasks[tasks.length-1].exercises[0]).toBe(2);
    expect(tasks[tasks.length-1].exercises[1]).toBe(4);
    expect(tasks[tasks.length-1].exercises[2]).toBe(5);
    expect(tasks[tasks.length-1].exercises[3]).toBe(6);
    expect(tasks[tasks.length-1].exercises[4]).toBe(7);

});

test('GET /tasks filtered should return list of tasks', async () => {
    const response = await request(url).get('/tasks?name=FirstTask');
    expect(response.statusCode).toBe(200);

    const tasks = response.body.result;

    expect(tasks).toBeDefined();
    expect(tasks[tasks.length-1]).toBeDefined();

    expect(tasks[tasks.length-1].name).toBe("FirstTask");
    expect(tasks[tasks.length-1].exercises[0]).toBe(1);
    expect(tasks[tasks.length-1].exercises[1]).toBe(2);
    expect(tasks[tasks.length-1].exercises[2]).toBe(5);
});





// ============================== Tasks - POST ==============================
test('POST /tasks return 201', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Testing task",
        exercises:[0,1,2]}
    );

    expect(response.statusCode).toBe(201);
});

test('POST /tasks with existing name return 201', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Testing task",
        exercises:[0,1]}
    );

    expect(response.statusCode).toBe(201);
});

test('POST /tasks with existing set of exercises return 201', async () => {
    const response = await request(url).post('/tasks').send({
        name: "New testing task",
        exercises:[0,1,2]}
    );

    expect(response.statusCode).toBe(201);
});


test('POST /tasks without name return 201', async () => {
    const response = await request(url).post('/tasks').send({
        exercises:[0,1,2]}
    );

    expect(response.statusCode).toBe(201);
});

test('POST /tasks return 400 for wrong name', async () => {
    const response = await request(url).post('/tasks').send({
        name: 0,
        exercises: [0,1,2]
    });

    expect(response.statusCode).toBe(400);
});

test('POST /tasks return 400 for wrong exercises', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Test",
        exercises: ['a',2,3]
    });

    expect(response.statusCode).toBe(400);
});

test('POST /tasks return 400 for missing exercises', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Test",
    });

    expect(response.statusCode).toBe(400);
});

test('POST /tasks return 400 for empty exercises', async () => {
    const response = await request(url).post('/tasks').send({
        name: "Test",
        exercises: []
    });

    expect(response.statusCode).toBe(400);
});


// ============================== Tasks/:id - GET ==============================
test('GET /tasks/:id return 200', async () => {
    const response = await request(url).get('/tasks/' + temp_id);
    expect(response.statusCode).toBe(200);
});


test('GET /tasks/:id should return the specified task', async () => {
    const response = await request(url).get('/tasks/' + temp_id);
    expect(response.statusCode).toBe(200);

    const task = response.body;

    expect(task).toBeDefined();

    expect(task.name).toBe("FirstTask");
    expect(task.exercises[0]).toBe(1);
    expect(task.exercises[1]).toBe(2);
    expect(task.exercises[2]).toBe(5);
});


test('GET /tasks/:id return 404', async () => {
    const response = await request(url).get('/tasks/' + new mongoose.Types.ObjectId());
    expect(response.statusCode).toBe(404);
});





// ============================== Tasks/:id - PUT ==============================
test('PUT /tasks/:id modify name should return 200', async() => {
	const response = await request(url).put('/tasks/' + temp_id).send({
		name: "modified_name"
	});

	expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("modified_name");
});

test('PUT /tasks/:id modify name again to check IDEMPOTENT behavior should return 200', async() => {
	const response = await request(url).put('/tasks/' + temp_id).send({
		name: "modified_name"
	});

	expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("modified_name");
});

test('PUT /tasks/:id modify exercises should return 200', async() => {
	const response = await request(url).put('/tasks/' + temp_id).send({
		exercises: [10,9,8,7,6]
	});

	expect(response.statusCode).toBe(200);
    expect(response.body.exercises[0]).toBe(10);
    expect(response.body.exercises[1]).toBe(9);
    expect(response.body.exercises[2]).toBe(8);
    expect(response.body.exercises[3]).toBe(7);
    expect(response.body.exercises[4]).toBe(6);

});


test('PUT /tasks/:id modify name exercises should return 200', async() => {
	const response = await request(url).put('/tasks/' + temp_id).send({
        name: "name_modified_again",
		exercises: [1]
	});

	expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("name_modified_again");
    expect(response.body.exercises[0]).toBe(1);
});


test('PUT /tasks/:id wrong id should return 404', async() => {
	const response = await request(url).put('/tasks/' + new mongoose.Types.ObjectId()).send({
		name: "modified_name"
	});

	expect(response.statusCode).toBe(404);
});






// ============================== Tasks/:id - DELETE ==============================
test('DELETE /tasks/:id should return 200', async() => {
	const response = await request(url).delete('/tasks/' + temp_id);

	expect(response.statusCode).toBe(200);
});


test('DELETE /tasks/:id with already deleted task should return 404', async() => {
	const response = await request(url).delete('/tasks/' + temp_id);

	expect(response.statusCode).toBe(404);
});


test('DELETE /tasks/:id with non existing id should return 404', async() => {
	const response = await request(url).delete('/tasks/' + new mongoose.Types.ObjectId());

	expect(response.statusCode).toBe(404);
});
