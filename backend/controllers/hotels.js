const hotels = require("../Data/hotels.json");
const Hotel = require("../models/hotel");
const Photos = require("../models/photos");

const mongoose = require("mongoose").ObjectID;

// exports.getHotels = async (req, res, next) => {
// Nap du lieu vao data mongoose
//   const news = new Hotel({
//         address: "Hang Da, 95 Hang Bong Street, Old Quarter, Hanoi, Vietnam",
//         cheapestPrice: 150,
//         city: "Ha Noi",
//         desc: "Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Strategically situated in Old Quarter, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous Old Quarter. Rated with 4 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site.",
//         distance: "10",
//         featured: true,
//         name: "HANOI ROYAL PALACE HOTEL 2",
//         photos: [
//           "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FNJS301%2FAssignment_Image%2FAssignment_02%2Fe76962680bcc984f7b0876da6ac5caa8.jpg?alt=media&token=f4fe570e-703f-47be-8510-65fea3bf73ed",
//           "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FNJS301%2FAssignment_Image%2FAssignment_02%2F0a77da6e3c4f95e95bd84f5dbaeb2a74.jpg?alt=media&token=14e08975-1878-472b-92be-e4af91fa45bf",
//           "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FNJS301%2FAssignment_Image%2FAssignment_02%2F25517748837ba92fcb96c176f627d498.jpg?alt=media&token=5d9c6054-332a-4804-8606-e484fb8ba412",
//           "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FNJS301%2FAssignment_Image%2FAssignment_02%2F57474c14e32152ea509c39adaaf3f781.jpg?alt=media&token=98f2ad6b-c527-491a-a5ef-57dc2d21401a"
//         ],
//         rooms: [
//           "6310dd998cfecfd90b30ca28"
//         ],
//         title: "HANOI ROYAL PALACE HOTEL 2",
//         type: "hotel",
//         rating: 4
// })

// await news.save();
//   const aa = await Hotel.find();
//   console.log(aa);
//   res.status(200).json({ message: "Fetched posts successfully.", posts: aa });
// try {
//   res.json(hotels);
// } catch (e) {
//   console.log(e);
// }
exports.getHotels = async (req, res, next) => {
  Hotel.find()
 .then(items => {
  res.json(items)
  // console.log("items", items)
 })
 . catch(err => {
  console.log(err)
 })
};

exports.postCity = async (req, res, next) => {
  const getCity = req.body.city;

  console.log("isTrue", { city: getCity });
  //   console.log("1", hotels[0].city);
  //     console.log('hotels', hotels[1])
  let getCheck = getCity.toString();
  let r = getCheck;

  r = r.replace(new RegExp(/[àáâãäåạảăắằẵặấầẩẫẩ]/g), "a");
  r = r.replace(new RegExp(/[èéêëẹẽếềễể]/g), "e");
  r = r.replace(new RegExp(/[ìíîïịỉ]/g), "i");
  r = r.replace(new RegExp(/[òóôõöọơỏớờốồỡởốồỗổộợ]/g), "o");
  r = r.replace(new RegExp(/[ùúûüưứừữửự]/g), "u");
  r = r.replace(new RegExp(/[ýÿỹỳỷỵ]/g), "y");
  // r = r.replaceAll('', ' ');

  // console.log("r", r);
  let userRegex = new RegExp(r, "i"); //'i' khong phan biet chu hoa chu thuong
  console.log("getCheck", getCheck, typeof getCheck);//

  Hotel.find({ city: userRegex })
    .then((posts) => {
      // console.log("posts", posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getHotelID = async (req, res, next) => {
  const hotelId = req.query;
  console.log("hotelId", hotelId);

  Hotel.findById(hotelId)
  .then(result => {
    console.log('result', result)
    res.json(result)
  })
  .catch(e => {console.log(e)})
  // for (let i = 0; i < hotels.length; i++) {
  //   if (hotels[i]._id.$oid === hotelId) {
  //     res.json(hotels[i]);
  //     // console.log(hotels[i]);
  //   }
  // }
};
exports.postDeleteHotel = async(req, res, next) => {
  const hotelId = req.query.id;
  // console.log("req.body", hotelId)
  Hotel.findByIdAndDelete(hotelId)
  .then(() => {
    res.send("Done!")
  })
  .catch(e => console.log(e))
}

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const city = req.body.city;
  const distance = req.body.distance;
  const desc = req.body.desc;
  const rooms = req.body.rooms;
  const type = req.body.type;
  const address = req.body.address;
  const title = req.body.title;
  const price = req.body.price;
  const featured = req.body.featured;
  const photos = req.body.photos;
  const rating = 3;

  console.log("distance", req.body)

  const hotel = new Hotel({
    name: name,
    city: city,
    distance: distance, 
    desc: desc,
    rooms: rooms, 
    type: type,
    address: address,
    title: title,
    price: price,
    featured: featured,
    rating: rating,
    photos: photos
  })
  hotel.save()
  .then(result => {
    res.json(result)
  })
  .catch(e => console.log(e))
}
let editId;
exports.postEditHotel = (req, res, next) => {
  editId = req.query.id;
  console.log('editId', editId)
  Hotel.findById(editId)
  .then(result => {res.json(result)})
  .catch(e => console.log(e))
}
exports.getEditHotel = (req, res, next) => {
   Hotel.findById(editId)
   .then(result => {res.json(result)})
   .catch(e=>console.log(e))
}

exports.postNewEditHotel = async (req, res, next) => {
  const name = req.body.name;
  const city = req.body.city;
  const distance = req.body.distance;
  const desc = req.body.desc;
  const rooms = req.body.rooms;
  const type = req.body.type;
  const address = req.body.address;
  const title = req.body.title;
  const price = req.body.price;
  const featured = req.body.featured;
  const photos = req.body.photos;
  const rating = 3;
  
  try { 
    const doc = await Hotel.findOneAndUpdate({_id: editId}, req.body, {
      new: true
    })
    // console.log(doc);
    res.json({doc})
  } catch(e) {
    console.log(e)
  }
  
}
exports.newImages = (req, res, next) => {
  const images = req.body.photos;
  console.log('images', images)
  const photo = new Photos({
    photos: images
  })
  photo.save()
  .then(result => {
    res.json({message: "Photos_url", result})
  })
  .catch(e => {console.log(e)})
}
exports.getImages = (req, res, next) => {
  Photos.find()
  .then(result => {
    res.json(result)
  }) 
  .catch(e => console.log(e))
}