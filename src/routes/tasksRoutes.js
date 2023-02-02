const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");
const {createTaskValidation, udateTaskValidation} = require("../middlewares/tasksValidationMiddleware");


router.route("/")
    .get(taskController.getAllTasks)
    .post(createTaskValidation, taskController.createTask)
    .delete(taskController.deleteFinishedTasks);
router.route("/:id")
    .get(taskController.getTaskById)
    .put(udateTaskValidation, taskController.updateTask);

module.exports = router;