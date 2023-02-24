const listsService = require('../services/listsService');

const getAllLists = async (req, res) => {
    const lists = await listsService.getAllLists();
    res.status(200).send(lists);
}

const createList = async (req, res) => {
    const list = await listsService.createList(req.body);
    res.status(201).send(list);
}

const getListById = async (req, res) => {
    const list = await listsService.getListById(req.params.listId);
    res.status(200).send(list);
}

const updateList = async (req, res) => {
    const list = await listsService.updateList(req.params.listId, req.body);
    res.status(200).send(list);
}

const deleteList = async (req, res) => {
    await listsService.deleteList(req.params.listId);
    res.status(204).send();
}

module.exports = {getAllLists, createList, getListById, updateList, deleteList};