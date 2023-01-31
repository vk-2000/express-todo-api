const db = require("../database/models/index")
const Task = require("../database/models/task")(db.sequelize, db.Sequelize)


const getAllTasks = async () => {
    const tasks = await Task.findAll();
    return tasks;
};

const createTask = async (data) => {
    data["isComplete"] = false;
    const task = await Task.create(data)
    return task;
}
const deleteFinishedTasks = async () => {
    await Task.destroy({
        where: {
            isComplete: true
        }
    })
}
const getTaskById = async (id) => {
    const task = await Task.findAll({
        where: {
            id: id
        }
    })
    return task;
}
const updateTask = async (id, data) => {
    const result = await Task.update(data, {
        where: {
            id: id
        }, returning: true
    })
    return result;
}
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask}