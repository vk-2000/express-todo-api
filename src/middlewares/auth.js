const { default: axios } = require("axios");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    // make axios post request to auth service and check if token is valid
    axios.post("http://localhost:4000/token/verify", {token})
        .then((response) => {
            console.log(response.data);
            next();
        })
        .catch((err) => {
            res.status(401).send({msg: err.message});
        });
}

module.exports = {authenticateUser};