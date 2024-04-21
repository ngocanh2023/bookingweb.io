const Reserve = require("../models/reserve");
// const Room = require("../models/room")

exports.getReserve = async (req, res, next) => {
    const email = req.body.email;
    Room.findById({email})
   .then(result => {
    res.json(result);
    console.log(result)
   })
   .catch(e => {
    console.log(e)
   })
}

exports.postReserve = async (req, res, next) => {
    console.log('req.body', req.body)
    // const id = req.body._id;
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    const hotel = req.body.hotel;
    const room = req.body.room;
    const selectValue = req.body.selectValue;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const identity = req.body.identity;
    const price = req.body.price;

    const roomInfo = new Reserve({
        // _id: id,
        dateFrom: dateFrom,
        dateTo: dateTo,
        hotel: hotel,
        room: room,
        selectValue: selectValue,
        fullname: fullname,
        email: email,
        phone: phone,
        identity: identity,
        price: price
    });
   

    roomInfo.save()
    .then(result => {
        res.json(req.body)
        // console.log("req.body", req.body)
    })
   .catch(err => {console.log(err)})
}
