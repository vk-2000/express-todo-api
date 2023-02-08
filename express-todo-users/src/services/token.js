const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    const decoded = jwt.verify(token, "somesecretwhichiwillchangelater");
    return decoded;
}

module.exports = { verifyToken };