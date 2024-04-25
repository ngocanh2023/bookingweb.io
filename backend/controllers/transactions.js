const Reserve = require("../models/reserve");

exports.postTransactions = async (req, res, next) => {
    const email = req.body.email;
    Reserve.find({email})
   .then(result => {
    res.json(result);
    console.log(result)
   })
   .catch(e => {
    console.log(e)
   })
}
