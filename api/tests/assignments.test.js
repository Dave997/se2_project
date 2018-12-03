const myHttp = require("../../util/httpRequest");
const url = "http://localhost:3000/assignments";

const validPostAssignments = [{
    name: "Assignment 1",
    taskId: "123",
    userGroupId: "456",
    deadline: new Date(),
  },
  {
    name: "Assignment 2",
    taskId: "123",
    userGroupId: "456",
  },
];



const notValidAssignments = [{
    taskId: "123",
    userGroupId: "456",
    deadline: new Date(),
  },
  {
    name: "Assignment 1",
    userGroupId: "456",
    deadline: new Date(),
  },
  {
    name: "Assignment 1",
    taskId: "123",
    deadline: new Date(),
  }
];

// GET
test("GET /assignments 200", async () => {
  let request = await myHttp.Get(url);
  console.log(request.status);
  expect(request).not.toBeUndefined();
  expect(request.status).toBe(200);
  request.json().then(body => {
    expect(Array.isArray(body)).toBe(true);
  })
});

// POST
test("POST /assignments: 200", async () => {
  validPostAssignments.forEach(async validPostBody => {
    let request = await myHttp.PostJson(url, validPostBody);
    expect(request).not.toBeUndefined();
    expect(request.status).toBe(201);
    request.json().then(body => {
      expect(body.name).toEqual(validPostBody.name);
      expect(body.userGroupId).toEqual(validPostBody.userGroupId);
      expect(body.taskId).toEqual(validPostBody.taskId);
      if (validPostBody.deadline) {
        let dateCreated = new Date(body.deadline);
        expect(dateCreated).toEqual(validPostBody.deadline);
      }
    }).catch(err => {
      console.error(err);
      throw new Error("Error in request");
    })
  });
});

test("POST /assignments: 400", async () => {
  notValidAssignments.forEach(async notValidAssignment => {
    let request = await myHttp.PostJson(url, notValidAssignment);
    expect(request).not.toBeUndefined();
    expect(request.status).toBe(400);
  });
});

test("POST and GET/assignments/:id ->  200", async () => {
  let assignment = {
    name: "test",
    taskId:"101",
    userGroupId:"3302",
    deadline: new Date()
  };

  let create = await myHttp.PostJson(url, assignment);
  expect(create).not.toBeUndefined();
  expect(create.status).toBe(201);
  create.json().then(async body => {
    let id = body.id;
    expect(id).not.toBeNull();
    let read = await myHttp.Get(`${url}/${id}`);
    expect(read).not.toBeUndefined();
    expect(read.status).toBe(200);
    read.json(saved => {
      expect(read.name).toEqual(assignment.name);
      expect(read.userGroupId).toEqual(assignment.userGroupId);
      expect(read.taskId).toEqual(assignment.taskId);
      if (assignment.deadline) {
        let dateCreated = new Date(read.deadline);
        expect(dateCreated).toEqual(assignment.deadline);
      }
    });
  });

});