const {List} = require("../models");

const getAllLists = async () => {
    const lists = await List.findAll();
    return lists;
};

const createList = async (data) => {
    const list = await List.create(data);
    return list;
};

const getListById = async (id) => {
    const list = await List.findOne({
        where: {
            id: id
        },
        include: "Tasks"
    });
    if(list == null){
        throw new HTTPerror("List not found", 404);
    }
    return list;
};

const updateList = async (id, data) => {
    const result = await List.update(data, {
        where: {
            id: id
        }, returning: true
    });
    const affectedRows = result[0];
    if(affectedRows === 0){
        throw new HTTPerror("List not found", 404);
    }
    return result;
};

const deleteList = async (id) => {
    await List.destroy({
        where: {
            id: id
        }
    });
};

module.exports = {getAllLists, createList, getListById, updateList, deleteList};