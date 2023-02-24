const taskServices = require("../services/tasksService");
const Joi = require("joi");
const HTTPerror = require("../utils/errors/HTTPerror");

const getAllTasks = async (req, res) => {
    const listId = req.params.listId;
    const tasks = await taskServices.getAllTasks(listId);
    res.status(200);
    res.send(tasks);
};
const createTask = async (req, res) => {
    const data = req.body;
    const listId = req.params.listId;
    const taskCreated = await taskServices.createTask(listId, data);
    res.status(201).send(taskCreated);
};
const deleteFinishedTasks = async (req, res) => {
    await taskServices.deleteFinishedTasks();
    res.status(204).send({"msg": "Deleted finished tasks"});
};

const getTaskById = async (req, res) => {
    const id = req.params.id;
    try{
        const result = await taskServices.getTaskById(id);
        res.send(result);

    }
    catch(err){
        if(err instanceof HTTPerror){
            res.status(err.code).send({msg: err.message});
        }
        else{
            res.status(500).send({msg: err.message});
        }

    }
};
const updateTask = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedTask = await taskServices.updateTask(id, req.body);
        res.status(200).send(updatedTask);
    }
    catch(err) {
        if(err instanceof HTTPerror){
            res.status(err.code).send({msg: err.message});
        }
        else{
            res.status(500).send({msg: "Something went wrong"});
        }
    }
};
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask};