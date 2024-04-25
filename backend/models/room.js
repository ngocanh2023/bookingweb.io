const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  // _id: { type: String },
//   id: { $oid: { type: String } },
  // __v: { type: Number },
  createdAt: {
    $date: { type: String },
  },
  desc: { type: String },
  maxPeople: { type: Number },
  price: { type: Number },
  hotelName: {type: String},
  roomNumbers: { type: String },
  title: { type: String },
  updatedAt: {
    $date: { type: Date },
  },
  email: { type: String }
  // fullname: { type: String },
  // phone: { type: String },
  // identity: { type: String },
});

module.exports = mongoose.model("Room", roomSchema);
