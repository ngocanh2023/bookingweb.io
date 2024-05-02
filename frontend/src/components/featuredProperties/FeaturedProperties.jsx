import React, { useState, useEffect } from "react";
import "./featuredProperties.css";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const [dataHotels, setDataHotels] = useState([]);
  // console.log("dataHotels", dataHotels);
  let imageUrl1, imageUrl2, imageUrl3, imageUrl4;

  const navigate = useNavigate();

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

  if (!!dataHotels) {
    imageUrl1 = dataHotels[0]?.photos[3];
    imageUrl2 = dataHotels[1]?.photos[1];
    imageUrl3 = dataHotels[2]?.photos[2];
    imageUrl4 = dataHotels[3]?.photos[0];
  }
  // const hotelId0 = dataHotels[0]._id.$oid;
  const handleHotel = async (i) => {
    try{
      // navigate(`/hotels/${dataHotels[i]._id.$oid}`);
      navigate(`/hotels/${dataHotels[i]._id}`);
    }  catch(e){console.log(e)}
  };

  return (
    <div className="fp">
      <div className="fpItem">
        <img src={imageUrl1} alt="" className="fpImg" />
        <span className="fpName">
          <div
            //  href="./hotels?hotelId=hotelId0"
            target="_blank"
            onClick={() => {
              handleHotel(0);
            }}
          >
            {dataHotels[0]?.name}
          </div>
        </span>
        <span className="fpCity">{dataHotels[0]?.city}</span>
        <span className="fpPrice">
          Starting from ${dataHotels[0]?.cheapestPrice}
        </span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img src={imageUrl2} alt="" className="fpImg" />
        <span className="fpName">
          <div
            // href="./hotels/0"
            onClick={() => {
              handleHotel(1);
            }}
            target="_blank"
          >
            {dataHotels[1]?.name}
          </div>
        </span>
        <span className="fpCity">{dataHotels[1]?.city}</span>
        <span className="fpPrice">
          Starting from ${dataHotels[1]?.cheapestPrice}
        </span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img src={imageUrl3} alt="" className="fpImg" />
        <span className="fpName">
          <div
            // href="./hotels/0"
            onClick={() => {
              handleHotel(2);
            }}
            target="_blank"
          >
            {dataHotels[2]?.name}
          </div>
        </span>
        <span className="fpCity">{dataHotels[2]?.city}</span>
        <span className="fpPrice">
          Starting from ${dataHotels[2]?.cheapestPrice}
        </span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img src={imageUrl4} alt="" className="fpImg" />
        <span className="fpName">
          <div
            // href="./hotels/0"
            onClick={() => {
              handleHotel(3);
            }}
            target="_blank"
          >
            {dataHotels[3]?.name}
          </div>
        </span>
        <span className="fpCity">{dataHotels[3]?.city}</span>
        <span className="fpPrice">
          Starting from ${dataHotels[3]?.cheapestPrice}
        </span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      
    </div>
  );
};

export default FeaturedProperties;
