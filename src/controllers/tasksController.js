const taskServices = require("../services/tasksService")

const getAllTasks = async (req, res) => {
    const tasks = await taskServices.getAllTasks();
    res.send(tasks);
}
const createTask = async (req, res) => {
    const data = req.body;
    const taskCreated = await taskServices.createTask(data);
    res.status(201);
    res.send(taskCreated);
}
const deleteFinishedTasks = async (req, res) => {
    await taskServices.deleteFinishedTasks();
    res.send({"msg": "Deleted finished tasks"});
}

const getTaskById = async (req, res) => {
    const id = req.params.id;
    const result = await taskServices.getTaskById(id);
    res.send(result);
}
const updateTask = async (req, res) => {
    const id = req.params.id;
    const updatedTask = await taskServices.updateTask(id, req.body);
    res.send(updatedTask);
    

}
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask};