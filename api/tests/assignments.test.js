const myHttp = require("../../util/httpRequest");
const config = require("../../config");

const url = config.SERVER_PATH+"/assignments";

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
    taskId: "101",
    userGroupId: "3302",
    deadline: new Date()
  };

  let create = await myHttp.PostJson(url, assignment);
  expect(create).not.toBeUndefined();
  expect(create.status).toBe(201);

  create.json().then(async body => {
    // console.log(body); OK
    let id = body.id;
    expect(id).not.toBeNull();

    let get = myHttp.Get(`${url}/${id}`);
    get.then(read => {
      expect(read).not.toBeUndefined();
      expect(read.status).toBe(200);
      read.json(saved => {
        console.log("OKKK");
        expect(read.name).toEqual(assignment.name);
        expect(read.userGroupId).toEqual(assignment.userGroupId);
        expect(read.taskId).toEqual(assignment.taskId);
        if (assignment.deadline) {
          let dateCreated = new Date(read.deadline);
          expect(dateCreated).toEqual(assignment.deadline);
        }
      }).catch(err => {
        throw new Error(err);
      });
    }).catch(err => {
      throw new Error(err);
    });
  });
});

test("POST and DELETE /assignments/:id ->  200", async () => {
  let assignment = {
    name: "test",
    taskId: "101",
    userGroupId: "3302",
    deadline: new Date()
  };

  let post = await myHttp.PostJson(url, assignment);
  let created = await post.json();
  let id = created.id;

  expect(id).not.toBeUndefined();

  let get = await myHttp.Get(`${url}/${id}`);
  created = await get.json();

  expect(created.id).toEqual(id);

  let del = await myHttp.Delete(`${url}/${id}`);
  expect(del.status).toEqual(200);

  get = await myHttp.Get(`${url}/${id}`);
  expect(get.status).toEqual(404);

});

test("POST, DELETE, DELETE /assignments/:id ->  404", async () => {
  let assignment = {
    name: "test",
    taskId: "101",
    userGroupId: "3302",
    deadline: new Date()
  };

  let post = await myHttp.PostJson(url, assignment);
  let created = await post.json();
  let id = created.id;

  expect(id).not.toBeUndefined();

  let get = await myHttp.Get(`${url}/${id}`);
  created = await get.json();

  expect(created.id).toEqual(id);

  let del = await myHttp.Delete(`${url}/${id}`);
  expect(del.status).toEqual(200);

  get = await myHttp.Get(`${url}/${id}`);
  expect(get.status).toEqual(404);

  del = await myHttp.Delete(`${url}/${id}`);
  expect(del.status).toEqual(404);

});

test("POST, UPDATE, /assignments/:id ->  200", async () => {
  let assignment = {
    name: "test",
    taskId: "101",
    userGroupId: "3302",
    deadline: new Date()
  };

  let updates = [{
      name: "test",
    },
    {
      taskId: "101",
    },
    {
      userGroupId: "3302",
    },
    {
      deadline: new Date()
    },
    {
      name: "test",
      taskId: "101",
    },
    {
      taskId: "101",
      userGroupId: "3302",
    },
    {
      userGroupId: "3302",
      deadline: new Date()
    },
    {
      taskId: "101",
      userGroupId: "3302",
      deadline: new Date()
    },
    {
      name: "test",
      taskId: "101",
      userGroupId: "3302",
      deadline: new Date()
    },
  ];

  for (body in updates) {

    let post = await myHttp.PostJson(url, assignment);
    let created = await post.json();
    let id = created.id;

    let put = await myHttp.PutJson(`${url}/${id}`)
    expect(put.status).toBe(200);
    let updated = await put.json();

    updated.deadline = new Date(updated.deadline);

    for (key in assignment) {
      if (!body[key])
        expect(updated[key]).toEqual(assignment[key]);
      else
        expect(updated[key]).toEqual(body[key]);


    }
  }
});

test("DELETE id not foud", async () => {
  let del = await myHttp.Delete(`${url}/not existing`);
  expect(del.status).toEqual(404);
})

test("PUT id not foud", async () => {
  let put = await myHttp.PutJson(`${url}/not existing`, {});
  expect(put.status).toEqual(400);
})

test("NOT VALID PUT id not foud", async () => {

  let assignment = {
    name: "test",
    taskId: "101",
    userGroupId: "3302",
    deadline: new Date()
  };

  let post = await myHttp.PostJson(url, assignment);
  let created = await post.json();
  let id = created.id;

  let put = await myHttp.PutJson(`${url}/${id}`, {lala:123});
  expect(put.status).toEqual(400);

  put = await myHttp.PutJson(`${url}/${id}`, {id:123});
  expect(put.status).toEqual(400);

  put = await myHttp.PutJson(`${url}/${id}`, {deleted:true});
  expect(put.status).toEqual(400);
})