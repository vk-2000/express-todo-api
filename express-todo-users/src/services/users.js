const {User} = require('../models');

const createUser = async (user) => {
    const createdUser = await User.create(user);
    return {id: createdUser.id, username: createdUser.username, email: createdUser.email}
};

module.exports = {createUser};

