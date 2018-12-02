const express = require('express');
const router = express.Router();

const Task = require("../models/task");
const TaskController = require("../controllers/tasks");

router.get("/", TaskController.tasks_get_all);

router.post("/", TaskController.tasks_post_createTask);

router.get("/:id", TaskController.tasks_get_singleTask);

router.put("/:id", TaskController.task_put_modify);

module.exports = router;
