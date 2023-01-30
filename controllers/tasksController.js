const taskServices = require("../services/tasksService")

const getAllTasks = (req, res) => {
    const tasks = taskServices.getAllTasks();
    res.send(tasks);
}
const createTask = (req, res) => {
    const data = req.body;
    const taskCreated = taskServices.createTask(data);
    res.status(201);
    res.send(taskCreated);
}
const deleteFinishedTasks = (req, res) => {
    taskServices.deleteFinishedTasks();
    res.send({"msg": "Deleted finished tasks"});
}

const getTaskById = (req, res) => {
    const id = req.params.id;
    try{
        const task = taskServices.getTaskById(id);
        res.send(task);
    }
    catch(err){
        res.status(404);
        res.send({"msg": err.message});
    }
}
const updateTask = (req, res) => {
    const id = req.params.id;
    try{
        const updatedTask = taskServices.updateTask(id, req.body);
        res.send(updatedTask);
    }
    catch(err){
        res.status(404);
        res.send({"msg": err.message});
    }

}
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask};