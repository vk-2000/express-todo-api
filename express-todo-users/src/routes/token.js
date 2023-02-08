const tokenController = require('../controllers/token');
const express = require('express');
const router = express.Router();

router.post('/verify', tokenController.verifyToken);

module.exports = router;