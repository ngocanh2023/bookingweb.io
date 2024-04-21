import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
// import { v4 as uuid } from "uuid";

import "./addNewRooms.css";

const AddRooms = () => {
  const navigate = useNavigate();
  const [dataHotel, setDataHotel] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [titleRoom, setTitle] = useState("");
  const [priceRoom, setPrice] = useState(0);
  const [descRoom, setDesc] = useState("");
  const [maxRoom, setMax] = useState(0);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [alert, setAlert] = useState(false);
  
  // console.log("dataHotel", dataHotel);
  // console.log("roomNumbers", roomNumbers);
  // console.log("titleRoom", titleRoom);
  // console.log("priceRoom", priceRoom);
  // console.log("descRoom", descRoom);
  // console.log("maxRoom", maxRoom);
  // console.log("hotelName", hotelName);

  const createdDay = new Date();
  // const createdAt = JSON.stringify(createdDay);
  // const createdAt = createdDay;

  // console.log("createdAt", createdAt, typeof createdAt);

  // const unique_id = uuid();
  // console.log("unique_id", unique_id, typeof unique_id);
  //Truong hop tu tao id model.findone({id:333}).remove()
  const fetchData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/hotels", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setDataHotel(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPostData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      createdAt: createdDay,
      hotelName: hotelName,
      roomNumbers: roomNumbers,
      title: titleRoom,
      price: priceRoom,
      desc: descRoom,
      maxPeople: maxRoom,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/newRoom", requestOptions)
      .then((response) => response.text())
      .then((result) => {})
      .catch((error) => console.error(error));
  };

  const checkValidate = () => {
    if(!hotelName || !titleRoom || !priceRoom || !descRoom || !maxRoom || !roomNumbers){
      setAlert(true);
    } else {
      fetchPostData();
      navigate("/addRooms")
    }
  }


  return (
    <div>
      <Navbar />
      <div className="features">
        <Sidebar />
        <div className="mainRooms">
          <div className="roomList">
            <h4>Add New Rooms</h4>
          </div>
          <div className="roomsTitle">
            <div className="roomContainers">
              <div className="contentRoom1">
                <div className="titleRoom">
                  <h4>Title</h4>
                  <div className="titleRoomInput">
                    <input
                      placeholder=" 2 beds room"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="priceRoom">
                  <h4>Price</h4>
                  <div className="priceRoomInput">
                    <input
                      placeholder=" 100"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="commaRoom">
                  <h4>Rooms</h4>
                  <div className="roomsInput">
                    <textarea
                      placeholder=" Give comma between room numbers"
                      onChange={(e) => {
                        setRoomNumbers(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="contetntRoom2">
                <div className="descRoom">
                  <h4>Description</h4>
                  <div className="descInput">
                    <input
                      placeholder=" King size bed, 1 bathroom"
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="maxPeopleRoom">
                  <h4>Max People</h4>
                  <div className="peopleInput">
                    <input
                      placeholder=" 2"
                      onChange={(e) => {
                        setMax(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="hotelRoom">
                  <h4>Choose A Hotel</h4>
                  <select
                    onChange={(e) => {
                      setHotelName(e.target.value);
                    }}
                  >
                    <option>None</option>
                    {dataHotel &&
                      dataHotel.map((item, i) => {
                        return (
                          <option value={item.name} key={i}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {alert && <div className="alertRoom">Please Fill In Blank!</div>}
          <div className="sendRoom">
            <button onClick={() => {
              checkValidate();
            
            }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRooms;
