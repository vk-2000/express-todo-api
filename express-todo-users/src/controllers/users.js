const usersService = require('../services/users');

const createUser = async (req, res) => {
    const user = req.body;
    const createdUser = await usersService.createUser(req.body);
    res.status(201).send(createdUser);
};

module.exports = {createUser};