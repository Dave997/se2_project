const express = require("express");
const assignments = require("../controllers/assignments");

const router = express.Router();

function initialize_db(){
  Assignment.deleteMany().exec().then(res =>{
    // OK
  }).catch(err=>{
    console.error("Error in db initialization: "+err);
  });
}

router.get('/', (req, res) => {
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
    if (!found)
      res.sendStatus(404);
    else {
      res.json(assignments.assignment_clean(found));
    }
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
});


router.put('/:id', (req, res) => {
  let id = req.params.id;
  let body = req.body;
  
  assignments.assignment_update(id, body).then(update => {
    if(!update)
      res.sendStatus(400);
    else
      res.send(assignments.assignment_clean(update));
  }).catch(err=>{
    console.error(err);
    res.sendStatus(500);
  });

});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let toDelete = assignments.assignment_delete_by_id(id);
  toDelete.then(deleted => {
    if(!deleted)
      res.sendStatus(404);
    else
      res.sendStatus(200);
  }).catch(err => {
    res.sendStatus(500);
  })
});


module.exports = router;