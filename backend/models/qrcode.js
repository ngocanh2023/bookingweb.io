const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    email: String,
    qrCode: String,
    // image: Buffer,
  });

module.exports = mongoose.model("QRCode", qrCodeSchema);