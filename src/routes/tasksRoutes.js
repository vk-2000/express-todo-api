const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");
const {createTaskValidation, updateTaskValidation} = require("../middlewares/tasksValidationMiddleware");
const {authenticateUser} = require("../middlewares/auth");


router.route("/")
    .get(authenticateUser, taskController.getAllTasks)
    .post(authenticateUser, createTaskValidation, taskController.createTask)
    .delete(authenticateUser, taskController.deleteFinishedTasks);
router.route("/:id")
    .get(authenticateUser, taskController.getTaskById)
    .put(authenticateUser, updateTaskValidation, taskController.updateTask);

module.exports = router;