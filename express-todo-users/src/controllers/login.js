const loginService = require('../services/login');

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try{
        const token = await loginService.loginUser(username, password);
        res.status(200).json({ token });
    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

module.exports = { loginUser };