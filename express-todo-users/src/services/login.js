const {User} = require('../models');
const jwt = require('jsonwebtoken');



const loginUser = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }
    if (await user.validatePassword(password) === false) {
        throw new Error('Password incorrect');
    }
    const token = jwt.sign({username}, "somesecretwhichiwillchangelater", { expiresIn: "1h" });
    return token;
}

module.exports = {loginUser};