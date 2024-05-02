const path = require('path');

const express = require('express');

const userController = require('../controllers/register');

const router = express.Router();

router.post('/register', userController.postUserRegister);

router.get('/register', userController.getUserRegister);

module.exports = router;