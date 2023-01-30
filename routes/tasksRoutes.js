const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController")


router.route("/")
    .get(taskController.getAllTasks)
    .post(taskController.createTask)
    .delete(taskController.deleteFinishedTasks)
router.route("/:id")
    .get(taskController.getTaskById)
    .put(taskController.updateTask);

module.exports = router;