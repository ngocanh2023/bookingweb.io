const path = require('path');
const express = require('express');

const qrcodeController = require("../controllers/qrcode")

const router = express.Router();

router.get("/generateQR", qrcodeController.generateQR)

router.post("/checkQRCode", qrcodeController.checkQRCode)

module.exports = router;