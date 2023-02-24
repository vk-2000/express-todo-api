const express = require("express");
const router = express.Router({mergeParams: true});
const taskController = require("../controllers/tasksController");
const {createTaskValidation, updateTaskValidation} = require("../middlewares/tasksValidationMiddleware");
// const {authenticateUser} = require("../middlewares/auth");


router.route("/")
    .get(taskController.getAllTasks)
    .post(createTaskValidation, taskController.createTask)
    .delete(taskController.deleteFinishedTasks);
router.route("/:taskId")
    .get(taskController.getTaskById)
    .put(updateTaskValidation, taskController.updateTask);

module.exports = router;