const express = require('express');

const router = express.Router();

const Taskcontroller = require("../controllers/tasks");

router.get("/", Taskcontroller.tasks_get_all);

router.post("/", Taskcontroller.tasks_post_createTask);

router.get("/:id", Taskcontroller.tasks_get_singleTask);

module.exports = router;
