import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import NavLog from "../../components/navbar/navlog";
import {  useCookies } from "react-cookie";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

import { removeVI } from 'jsrmvi';

const List = (index) => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  // eslint-disable-next-line
  const [options, setOptions] = useState(location.state.options);
  const [dataHotel, setDataHotel] = useState([]);
  const [click, setClick] = useState(false);
  const [dataHotelServer, setDataHotelServer] = useState([]);
  

   // eslint-disable-next-line
   const [cookies, setCookie] = useCookies(["user"]);
   let getLogin = cookies?.user;

  // console.log("dataHotel", dataHotel, typeof dataHotel);
  // console.log({destination})
  // console.log({dataHotelServer})

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

  const fetchSearch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      city: destination,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/hotels", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setDataHotelServer(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {getLogin?<NavLog/>:<Navbar/>}
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => {setDestination(removeVI((e.target.value), { replaceSpecialCharacters: false, ignoreCase: false }))}}/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={(e) => {fetchSearch(); console.log("click!"); setClick(true)}}>Search</button>
          </div>
          <div className="listResult">
           {click===false &&  <SearchItem dataHotel={dataHotel} key={index} /> }
           {click===true &&  <SearchItem dataHotel={dataHotelServer} key={index} /> }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
