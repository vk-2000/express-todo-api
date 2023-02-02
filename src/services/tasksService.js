const db = require("../models/index");
const {Task}= require("../models")
const HTTPerror = require("../utils/errors/HTTPerror");

const getAllTasks = async () => {
    const tasks = await Task.findAll();
    return tasks;
};

const createTask = async (data) => {
    data["isComplete"] = false;
    const task = await Task.create(data);
    return task;
};
const deleteFinishedTasks = async () => {
    await Task.destroy({
        where: {
            isComplete: true
        }
    });
};
const getTaskById = async (id) => {
    const task = await Task.findOne({
        where: {
            id: id
        }
    });
    if(task == null){
        throw new HTTPerror({msg: "Task not found"}, 404);
    }
    return task;
};
const updateTask = async (id, data) => {
    const result = await Task.update(data, {
        where: {
            id: id
        }, returning: true
    });
    const affectedRows = result[0];
    if(affectedRows === 0){
        throw new HTTPerror("Task not found", 404);
    }
    return result;
};
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask};