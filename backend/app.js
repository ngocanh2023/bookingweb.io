const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const register = require("./router/register");
const login = require("../backend/router/login");
const hotels = require("../backend/router/hotels");
const search = require("./router/room");
const reserve = require("./router/reserve")
const transactions = require("./router/transactions")
const admin = require("./router/admin")
const room = require("./router/room")

const cors = require("cors");
app.use(cors());

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(register);
app.use(login);
app.use(hotels);
app.use(search);
app.use(reserve);
app.use(transactions);
app.use(admin);
app.use(room);

//nhan file anh jpg dua ra api
app.use("/image", express.static("City Image"));

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

const mongooseUrl =
  "mongodb+srv://ngocanhea1:muFjTHZ2o83xaRZ1@cluster0.9qrspeg.mongodb.net/test";

const mongoose = require('mongoose');
mongoose.connect(mongooseUrl);
mongoose.Promise = global.Promise;
let dB = mongoose.connection;

dB.on('error', console.error.bind(console, 'Connect to mongo failed'));
//===============================
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

