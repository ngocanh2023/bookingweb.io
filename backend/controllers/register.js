const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getUserRegister = async (req, res, next) => {
  User.find()
    .then((user) => {
      console.log("user1", user);
      res.json(user);
    })
    .catch((err) => console.log(err));
};

exports.postUserRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const checkPassword = await bcrypt.hash(password, 10);

  console.log('req.body', req.body)
  // tim xem co bi trung thong tin dang ki khong
  const checkUnique = await User.findOne({ email });
//checkUnique ra 1 object thêm !!checkUnique để chuyển thành true false
  console.log("Register Uniqued!", !!checkUnique);

  if (!!checkUnique) {
    res.json({ success: false, message: "Uniqued! Register new one!" });
  } else {

    const userRegister = new User({
      username: username,
      password: checkPassword,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
    });

    userRegister
      .save()
      .then((result) => {     
        console.log('result', result)  
        res.send({ success: true, message: "Successful Register!" });
      })
      .catch((err) => {
        res.send({ success: false, message: "err" });
        console.log(err);
      });
  }
};
