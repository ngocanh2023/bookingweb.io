const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: String,
  city: String,
  distance: Number,
  desc: String,
  type: String,
  address: String,
  title: String,
  price: Number,
  featured: Boolean,
  rooms: Number,
  rating: Number,
  images: [String],
});

module.exports = mongoose.model("hotel", hotelSchema);
