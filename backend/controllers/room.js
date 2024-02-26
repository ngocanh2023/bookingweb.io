const hotelData = require("../Data/hotels.json");
const roomData = require("../Data/rooms.json");
const Room = require("../models/room");
const RoomLists = require("../models/roomLists");

exports.getRoom = async (req, res, next) => {
  // try {
  //   res.json(roomData);
  // } catch (err) {
  //   console.log(err);
  // }
  Room.find()
    .then((items) => {
      res.json(items);
      console.log("items", items);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSearch = (req, res, next) => {
  const createdDate = new Date(req.body.updatedAt.$date);
  const dateCheck = createdDate.getTime();
  const checkPeople = req.body.maxPeople;

  // console.log(req.body, req.body.maxPeople);
  // console.log("checkPeople", checkPeople);

  try {
    for (let i = 0; i < roomData.length; i++) {
      let roomCheck = new Date(roomData[i]?.updatedAt.$date);
      let getDate = roomCheck.getTime();
      let getPeople = roomData[i]?.maxPeople;

      // console.log(getPeople, checkPeople <= getPeople)

      if (dateCheck === getDate && checkPeople <= getPeople) {
        res.json(roomData[i].roomNumbers);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    res.json({ isTrue: false, message: "Room Unavailbled!" });
  }
};

exports.postNewRoom = (req, res, next) => {
  const id = req.body._id;
  const createdAt = req.body.createdAt;
  const hotelName = req.body.hotelName;
  const roomNumbers = req.body.roomNumbers;
  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;
  const maxPeople = req.body.maxPeople;

  console.log("req.body", req.body);

  const roomLists = new RoomLists({
    _id: id,
    createdAt: createdAt,
    hotelName: hotelName,
    roomNumbers: roomNumbers,
    title: title,
    price: price,
    desc: desc,
    maxPeople: maxPeople,
  });

  roomLists
    .save()
    .then((result) => {
      res.json({ message: "Done!" });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getPostRoom = (req, res, next) => {
  RoomLists.find()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postDeleteRoom = async (req, res, next) => {
  const roomId = req.query.id;
  // console.log('roomId', roomId)
  try {
    await RoomLists.findByIdAndDelete(roomId);
  } catch (e) {
    console.log(e);
  }
};
let roomIds;
exports.postEditRoom = async (req, res, next) => {
  roomIds = req.query.id;
  // console.log({ roomIds });
  res.json({ message: "Done" });
};
exports.getEditRoom = async (req, res, next) => {
  RoomLists.findById(roomIds)
    .then((result) => {
      // console.log('result', result)
      res.json(result);
    })
    .catch((e) => console.log(e));
};

exports.postNewEditHotel = async (req, res, next) => {
  try { 
    const updateRoom = await RoomLists.findOneAndUpdate({_id: roomIds}, req.body, {
      new: true
    })
    // console.log(updateRoom);
    res.json({updateRoom})
  } catch(e) {
    console.log(e)
  }
  
}