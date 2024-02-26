const path = require('path');

const express = require('express');

const hotelsController = require('../controllers/hotels')

const router = express.Router();

router.get("/hotels", hotelsController.getHotels)

router.post("/hotels", hotelsController.postCity)

router.post("/hotels/newProduct", hotelsController.postAddProduct)

router.post("/delete", hotelsController.postDeleteHotel)

router.post("/hotels/newEditProduct/", hotelsController.postEditHotel)

router.get("/hotels/newEditProduct", hotelsController.getEditHotel)

router.post("/hotels/postNewEditHotel", hotelsController.postNewEditHotel)

router.post("/hotels/images", hotelsController.newImages)

router.get("/hotels/images", hotelsController.getImages)

module.exports = router;