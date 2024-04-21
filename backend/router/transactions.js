const path = require('path');

const express = require('express');

const transactionsController = require('../controllers/transactions');

const router = express.Router();

router.post('/transactions', transactionsController.postTransactions);

module.exports = router;