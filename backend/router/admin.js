const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

router.post('/admin', adminController.postAdmin)

module.exports = router;