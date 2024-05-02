const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Hotel = require("../models/hotel");
const Room = require("../models/reserve");

exports.getUserLogin = (req, res, next) => {
  User.find()
    .then((user) => {
      // console.log("user1", user);
      res.json(user);
    })
    .catch((err) => console.log(err));
};

exports.postUserLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const checkHash = await User.findOne({ email });
  if (!checkHash) {
    return res.status(401).json({ error: 'Invalid checkHash!' });
  }

  const match = await bcrypt.compare(password, checkHash?.password);
  // console.log("email", email, password, !match, checkHash)

  try {
    if (!match) {
      res.send({ success: false, messages: "Wrong password!" });
    } else {
      res.send({ success: true, messages: "Successful Login!" });
    }
  } catch (e) {
    console.log(e);
  }
};
