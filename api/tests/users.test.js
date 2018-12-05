const request = require('supertest');
const fetch = require ('node-fetch');

const config = require('../../config');
const url = config.SERVER_PATH+"users";

var temp_id = undefined;
var temp_email = "autoTest"+Date.now()+"@test.it";
var temp_password = "autoTest";
var temp_token = undefined;

console.log(url);

// ================== POST ================== //
test('POST /users should return 201 user created!', async () => {
	const response = await request(url).post('/').send({
		email: temp_email,
		password: temp_password,
        name: "autoTest"
	});

	var obj = JSON.parse(response.text);
	temp_id = obj.user._id;
	
	expect(response.statusCode).toBe(201);
	expect(obj.message).toBe("User created");
});

//--------------- Error handling ---------------
test('POST /users with no-parameters return 401', async () => {
	const response = await request(url).post('/'); 
	
	expect(response.statusCode).toBe(401);
});

test('POST /users with one missing parameter return 401', async () => {
	const response = await request(url).post('/').send({
		email: "autoTest@test.it",
		password: "autoTest"
	});
	
	expect(response.statusCode).toBe(401);
});

test('POST /users with empty parameters return 401', async () => {
	const response = await request(url).post('/').send({
		email: "",
		password: "",
		name: ""
	});
	
	expect(response.statusCode).toBe(401);
});

test('POST /users already existing user return 409', async () => {
	const response = await request(url).post('/').send({
		email: "autoTest@test.it",
		password: "autoTest",
        name: "autoTest"
	});
	
	expect(response.statusCode).toBe(409);
});

// ================== GET ================== //
test('GET /users return 200', async () => {
	const response = await request(url).get('/');

	expect(response.statusCode).toBe(200);
});

test('GET /users/id return 200', async () => {
	const response = await request(url).get('/'+temp_id); 
	
	expect(response.statusCode).toBe(200);
});

//--------------- Error handling ---------------
test('GET /users/id deleted id return 401', async () => {
	const response = await request(url).get('/5bfec803124054189263178a'); 
	
	expect(response.statusCode).toBe(401);
});
test('GET /users/id wrong id return 400', async () => {
	const response = await request(url).get('/asd'); 
	
	expect(response.statusCode).toBe(400);
});

// =================== PUT =================== //
test('PUT /users/id modify name should return 200', async() => {
	const response = await request(url).put('/'+temp_id).send({
		name: "modified_name"
	});

	expect(response.statusCode).toBe(200);
});
test('PUT /users/id modify email should return 200', async() => {
	temp_email = "modified_email"+Date.now()+"@test.it";

	const response = await request(url).put('/'+temp_id).send({
		email: temp_email
	});

	expect(response.statusCode).toBe(200);
});
test('PUT /users/id modify name and mail should return 200', async() => {
	temp_email = "new_modified_email"+Date.now()+"@test.it";

	const response = await request(url).put('/'+temp_id).send({
		name: "new_modified_name",
		email: temp_email
	});

	expect(response.statusCode).toBe(200);
});

//--------------- Error handling ---------------
test('PUT /users/id no id sent should return 404', async() => {
	const response = await request(url).put('/').send({
		email: "modified_email"+Date.now()+"@test.it",
	});

	expect(response.statusCode).toBe(404);
});
test('PUT /users/id wrong parameter name should return 401', async() => {
	const response = await request(url).put('/'+temp_id).send({
		test: "test"
	});

	expect(response.statusCode).toBe(401);
});

// ================== LOGIN ================== //
test('POST /users/login should return 200', async() => {
	const response = await request(url).post('/login').send({
		email: temp_email,
		password: temp_password
	});

	var obj = JSON.parse(response.text);
	temp_token = obj.token;
	
	expect(response.statusCode).toBe(200);
});

// ================== DELETE ================== //
test('DELETE /users/id should return 200', async() => {
	return fetch(url + '/' + temp_id, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + temp_token
		}
	}).then(res => {expect(res.status).toBe(200)});
});

//--------------- Error handling ---------------
test('DELETE /users/id delete an already deleted user should return 401', async() => {
	return fetch(url + '/' + temp_id, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + temp_token
		}
	}).then(res => {expect(res.status).toBe(401)});
});
test('DELETE /users with no id should return 404', async() => {
	const response = await request(url).delete('/');

	expect(response.statusCode).toBe(404);
});
test('DELETE /users with wrong id should return 401', async() => {
	return fetch(url + '/asd', {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer' + temp_token
		}
	}).then(res => {expect(res.status).toBe(401)})
});
test('DELETE /users unauthorized user should return 401', async() => {
	const response = await request(url).delete('/'+temp_id);

	expect(response.statusCode).toBe(401);
});