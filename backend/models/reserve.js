const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reserveSchema = new Schema({
    // _id: {
    //     type: String,
    // },
    dateFrom: {
        type: String,
        required: true,
    },
    dateTo: {
        type: String,
        required: true,
    },
    hotel: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    selectValue: {
        type: String,
        required: true,
    }, 
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    identity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    }
    
})

module.exports = mongoose.model("Reserve", reserveSchema);