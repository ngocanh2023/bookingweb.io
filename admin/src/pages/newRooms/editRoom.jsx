import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
// import { v4 as uuid } from "uuid";

import "./addNewRooms.css";

const AddRooms = () => {
  const navigate = useNavigate();
  const [dataHotel, setDataHotel] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [titleRoom, setTitle] = useState("");
  const [priceRoom, setPrice] = useState(0);
  const [descRoom, setDesc] = useState("");
  const [maxRoom, setMax] = useState(0);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [alert, setAlert] = useState(false);

//   console.log("dataRoom", dataRoom);
  // console.log("roomNumbers", roomNumbers);
  // console.log("titleRoom", titleRoom);
  // console.log("priceRoom", priceRoom);
  // console.log("descRoom", descRoom);
  // console.log("maxRoom", maxRoom);
  // console.log("hotelName", hotelName);

//   const url = window.location.pathname.slice(22);
//   console.log("url", url);

  const fetchDataHotel = () => {
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

  const fetchDataRoom = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/addEditRooms", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log('result', result);
        setDataRoom(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDataRoom();
    fetchDataHotel();
  }, []);

  const fetchUpdateData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      price: priceRoom,
      title: titleRoom,
      roomNumbers: roomNumbers,
      desc: descRoom,
      maxPeople: maxRoom,
      hotelName: hotelName,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/editUpdateRoom", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const checkValidate = () => {
    if (
      !hotelName ||
      !titleRoom ||
      !priceRoom ||
      !descRoom ||
      !maxRoom ||
      !roomNumbers
    ) {
      setAlert(true);
    } else {
      fetchUpdateData();
      navigate("/addRooms");
    }
  };

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
                      placeholder={dataRoom.title}
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
                      placeholder={dataRoom.price}
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
                      placeholder={dataRoom.roomNumbers}
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
                      placeholder={dataRoom.desc}
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
                      placeholder={dataRoom.maxPeople}
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
            <button
              onClick={() => {
                checkValidate();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRooms;
