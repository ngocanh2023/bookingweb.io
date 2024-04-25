const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room")

router.get("/searchRoom", roomController.getRoom)

router.post("/searchHotel", roomController.postSearch)

router.post('/newRoom', roomController.postNewRoom)

router.get("/addRooms", roomController.getPostRoom)

router.delete("/deleteRoom", roomController.postDeleteRoom)

router.post("/addRooms", roomController.postEditRoom)

router.get("/addEditRooms", roomController.getEditRoom)

router.post("/editUpdateRoom", roomController.postNewEditHotel)

module.exports = router;