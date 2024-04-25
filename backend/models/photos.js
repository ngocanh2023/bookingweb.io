const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  photos: {
    type: Array,
    required: true,
  }
});

module.exports = mongoose.model("photos", hotelSchema);
