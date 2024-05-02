const path = require('path');

const express = require('express');

const loginController = require('../controllers/login')

const router = express.Router();

router.get("/login", loginController.getUserLogin )

router.post('/login', loginController.postUserLogin)

module.exports = router;