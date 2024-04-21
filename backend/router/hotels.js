const path = require('path');
const fs = require('fs');
const express = require('express');

const hotelsController = require('../controllers/hotels')
const Hotel = require("../models/hotel");

const router = express.Router();

router.get("/hotels", hotelsController.getHotels)

router.post("/hotels", hotelsController.postCity)

router.post("/delete", hotelsController.postDeleteHotel)

router.post("/hotels/newEditProduct/", hotelsController.postEditHotel)

router.get("/hotels/newEditProduct", hotelsController.getEditHotel)

router.post("/hotels/postNewEditHotel", hotelsController.postNewEditHotel)

router.post("/hotels/images", hotelsController.newImages)

router.get("/hotels/images", hotelsController.getImages)

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = '/'; //Duong dan dest sau localhost
        fs.access(dir, (err) => {
            if (err) {
                fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
            } else {
                cb(null, dir);
            }
        });
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|jfif|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only JPEG and JPG files are allowed!'));
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1000000 } });

router.post("/upload", upload.array('images', 10), (req, res) => {
    console.log('req.body', req.body)
    console.log('req.file', req.files)
    
    const formData = new Hotel({
      name: req.body.name,
      city: req.body.city,
      distance: req.body.distance,
      desc: req.body.desc,
      type: req.body.type,
      address: req.body.address,
      title: req.body.title,
      price: req.body.price,
      featured: req.body.featured,
      rooms: req.body.rooms,
      images: req.files.map((file) => file.path),
    });
  
    formData.save()
      .then(() => {
        res.status(200).json({ message: 'Form data saved successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  })

module.exports = router;