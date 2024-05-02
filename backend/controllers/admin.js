const Reserve = require("../models/reserve");

exports.postAdmin = async (req, res, next) => {
  const email = req.body.email;
  const page = parseInt(req.query.page) ;

  console.log("email", email, page)

  let count ;
  const perPage = 8;
  const pageCount = Math.ceil(count / perPage);
  const from = (page - 1) * perPage;
  let to = page * perPage;

  if (email === "admin@admin") {
    if (page < 1) {
      page = 1;
    } else if (page > pageCount) {
      page = pageCount;
    } else if (to < 0) to = 0;

    Reserve.find()
      .then((result) => {
        let totalPage ;
        count = Object.keys(result).length;
        const results = Object.fromEntries(
          Object.entries(result).slice(from, to)
        );
        if(count>8){
            totalPage = Math.round(count/8) + 1;
        } else {
            totalPage = 1;
        }

        res.json({results, totalPage});
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    res.send({ message: "Cant not login!" });
  }
};
