import { useState, useEffect } from "react";
import "./featured.css";

const Featured = () => {
  const [dataHotels, setDataHotels] = useState();

  const getHotels = async () => {
    await fetch("http://localhost:5000/hotels")
      .then((response) => response.text())
      .then((result) => {
        setDataHotels(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getHotels();
  }, []);

  // console.log("dataHotels", dataHotels, typeof dataHotels);
  let count = [];
  let volume = [];
  
  const setCountCity = (city) => {
    count = dataHotels?.map((data) => {
      return data.city === city;
    }, []);
    volume = count?.filter((x) => x === true).length;
    return volume;
  };


  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="http://localhost:5000/image/Ha%20Noi.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{setCountCity("Ha Noi")} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="http://localhost:5000/image/HCM.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{setCountCity("Ho Chi Minh")} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="http://localhost:5000/image/Da%20Nang.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{setCountCity("Da Nang")} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
