const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.route('/')
    .post(usersController.createUser);

module.exports = router;