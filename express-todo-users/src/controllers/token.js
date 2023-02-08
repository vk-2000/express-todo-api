const tokenService = require('../services/token');

const verifyToken = async (req, res) => {
    const token = req.body.token;
    try {
        const decoded = await tokenService.verifyToken(token);
        res.status(200).json({...decoded, valid: true});
    }
    catch (err) {
        return res.status(401).json({ valid: false, message: err.message });
    }
}

module.exports = { verifyToken };