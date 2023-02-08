const loginController = require('../controllers/login');

const express = require('express');
const router = express.Router();

router.post('/', loginController.loginUser);

module.exports = router;