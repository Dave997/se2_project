const express = require("express");
const assignments = require("../controllers/assignments");

const router = express.Router();

router.get('/', (req, res) => {
  console.log("get all")
  let promise = assignments.assignment_get_all();
  promise.then(query => {
    let response = query.map(a => assignments.assignment_clean(a));
    res.json(response);
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  let body = req.body;
  if (!body || !body.name || !body.taskId || !body.userGroupId)
    res.sendStatus(400);
  else {
    let promise = assignments.assignment_create(body);
    if (!promise)
      json.sendStatus(400);
    promise.then(created => {
      res.status(201);
      res.json(assignments.assignment_clean(created));
    }).catch(err => {
      res.sendStatus(500);
    });
  }
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let find = assignments.assignment_get_by_id(id);
  find.then(found => {
    res.json(assignments.assignment_clean(found));
  }).catch(err => {
    console.error(err);
    res.sendStatus(400);
  })
});


router.delete('/:id', (req, res) => {
  res.json({
    data: "not implemented jet"
  });
});

router.put('/:id', (req, res) => {
  res.json({
    data: "not implemented jet"
  });
});


module.exports = router;