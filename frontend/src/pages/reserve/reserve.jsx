import Navbar from "../../components/navbar/Navbar";
import NavLog from "../../components/navbar/navlog";
import {  useCookies } from "react-cookie";

import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../reserve/reserve.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Reserve = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [identity, setIdentity] = useState();
  const [selectValue, setSelectValue] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);
 
  // const [info, setInfo] = useState(false);
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(["user"]);
    let getLogin = cookies?.user;

  const dateCount = (new Date(dateTo) - new Date(dateFrom)) / (24 * 60 * 60 * 1000);
  const hotel = data.name;
  
  let totalBill;
  const priceCount = data.cheapestPrice;
  totalBill = priceCount * checkedCount * dateCount;
   
  const navigate = useNavigate();
  const url = window.location.pathname.slice(9);
  // console.log('url', url)

  const getHotels = async () => {
    await fetch("http://localhost:5000/hotels")
      .then((response) => response.text())
      .then((result) => {
        // console.log('result', result);
        const data = JSON.parse(result);
        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === url) {
            setData(data[i]);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setCheckedCount(prevCount => prevCount + 1);
    } else {
      setCheckedCount(prevCount => prevCount - 1);
    }
  };

  useEffect(() => {
    getHotels();
    // eslint-disable-next-line
  }, [])

  let room;
  function checkAll() {
    let inputs = document.querySelectorAll(".checkRoom");
    room = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked === true) {
        room.push(inputs[i].value);
      }
    }
  }
  checkAll();
  // console.log("room11", room);

  const fetchData = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // _id: url,
    dateFrom: dateFrom,
    dateTo: dateTo,
    hotel: hotel,
    room: JSON.stringify(room),
    selectValue: selectValue,
    price: data.cheapestPrice,
    fullname: fullname,
    email: email,
    phone: phone,
    identity: identity,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:5000/reserve", requestOptions)
    .then((response) => response.text())
    .then((result) => {console.log(result)})
    .catch((error) => console.log("error", error));
  }

  return (
    <div>
      {getLogin?<NavLog/>:<Navbar/>}
      <div className="reserveDetail">
        <div className="hotelDetail">
          <h3>{data.name}</h3>
          <div className="hotelDetailsTexts">
            <div className="nameDeseve">
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelPrice">
              <h4>${data.cheapestPrice} (1 nights)</h4>
              <div className="buttonReserve">
                <button
                  onClick={() => {
                    navigate(`/reserve/${data._id}`);
                  }}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="calendarReserve">
          <div className="calendar">
            <h3>Check Time</h3>
            <div>Check In From:</div>
            <div className="formCalendar">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  selected={dateFrom}
                  onChange={(dateFrom) => {
                    setDateFrom(dateFrom);
                  }}
                  required
                />
              </LocalizationProvider>
            </div>
            <div>Check Out To:</div>
            <div className="toCalendar">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  selected={dateTo}
                  onChange={(dateTo) => {
                    setDateTo(dateTo);
                  }}
                  required
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="reserve">
            <h3>Reserve Info</h3>
            <div className="fullname">
              <h4>Your Full Name:</h4>
              <div className="nameInput">
                <input
                  placeholder="Full Name"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="email">
              <h4>Your Email:</h4>
              <div className="emailInput">
                <input
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="phone">
              <h4>Your Phone Number:</h4>
              <div className="phoneInput">
                <input
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="card">
              <h4>Your Identity Card Number:</h4>
              <div className="cardInput">
                <input
                  placeholder="Card Number"
                  onChange={(e) => {
                    setIdentity(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="getRoom">
            <h3>Select Rooms</h3>
            <div className="doubleTwin">
              <div className="doubleRoom">
                <div>
                  <h4>Budget Double Room</h4>
                </div>
                <div className="budgetDouble">
                  <div className="room">
                    <div>Pay nothing until September 04,2024</div>
                    <div>Max people: 2</div>
                  </div>

                  <div className="boxDouble">
                    <div>
                      <div className="101">101</div>
                      <input
                        type="checkbox"
                        value="101"
                        id="101"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div>
                      <div className="201">201</div>
                      <input
                        type="checkbox"
                        value="201"
                        id="201"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div>
                      <div className="202">202</div>
                      <input
                        type="checkbox"
                        value="202"
                        id="202"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div>
                      <div className="301">301</div>
                      <input
                        type="checkbox"
                        value="301"
                        id="301"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="budgetTwin">
                <h4>Budget Twin Room</h4>

                <div className="twinRoom">
                  <div className="para2">
                    <div>Free cancellation before September 06, 2024</div>
                    <div>Max People: 2</div>
                  </div>
                  <div className="boxTwin">
                    <div>
                      <div>401</div>
                      <input
                        type="checkbox"
                        value="401"
                        id="401"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div>
                      <div>402</div>
                      <input
                        type="checkbox"
                        value="402"
                        id="402"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    <div>
                      <div>404</div>
                      <input
                        type="checkbox"
                        value="404"
                        id="404"
                        className="checkRoom"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="totalReserve">
          <h3 className="total">Total Bill: ${totalBill}</h3>
          {!totalBill && (
            <div className="infoAlert">
              Please Kindly Check Time And Get Room!
            </div>
          )}
          <div className="selectPayment">
            <select
              value={selectValue}
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
            >
              <option>Select Payment Method </option>
              <option value="Cash">Cash </option>
              <option value="Credit Card">Credit Card </option>
            </select>
            <div className="reseveNow">
              <button
                onClick={() => {
                  checkAll();
                  fetchData();
                  navigate(`/transactions/${getLogin.email}`);
                }}
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Reserve;
