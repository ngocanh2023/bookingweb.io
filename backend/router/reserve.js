const path = require('path');

const express = require('express');

const reserveController = require('../controllers/reserve');

const router = express.Router();

router.get('/reserve', reserveController.getReserve);

router.post('/reserve', reserveController.postReserve);

module.exports = router;