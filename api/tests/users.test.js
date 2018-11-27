const request = require('supertest');

const url = "http://localhost:3000/users";

test('GET /users return 200', async () => {
	const response = await request(url).get('/'); // in get write the path (eg :id)
	expect(response.statusCode).toBe(200);
});
test('GET /users/id return 200', async () => {
	const response = await request(url).get('/1'); 
	
	expect(response.statusCode).toBe(200);
});

test('POST /users should return 201 user created!', async () => {
	const response = await request(url).post('/').send({
		mail: "autoTest@test.it",
		password: "autoTest",
        name: "autoTest"
	});
	
	expect(response.statusCode).toBe(201);
	//expect(response["message"]).toBe("User created");
});

//================= Error handling =================
test('GET /users/id wrong id return 404', async () => {
	const response = await request(url).get('/asd'); 
	
	expect(response.statusCode).toBe(404);
});

test('POST /users with no-parameters return 401', async () => {
	const response = await request(url).post('/'); 
	
	expect(response.statusCode).toBe(401);
});

test('POST /users with one missing parameter return 401', async () => {
	const response = await request(url).post('/').send({
		mail: "autoTest@test.it",
		password: "autoTest"
	});
	
	expect(response.statusCode).toBe(401);
});

test('POST /users already existing user return 409', async () => {
	const response = await request(url).post('/').send({
		mail: "autoTest@test.it",
		password: "autoTest",
        name: "autoTest"
	});
	
	expect(response.statusCode).toBe(409);
	//expect(response.message).toBe("User already exists!");
});