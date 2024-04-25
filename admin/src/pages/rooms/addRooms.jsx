import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

import "./addRooms.css";

const AddRooms = () => {
  // var colors = ["Red", "Blue", "Orange", "Yellow"];
  // var options = [];

  // colors.forEach(function(color) {
  //   options.push(`<option value=${color}>${color}</option>`)
  // })

  const navigate = useNavigate();
  const [dataRoom, setDataRoom] = useState();

  // let itemID;
  console.log("dataRoom", dataRoom, typeof dataRoom);

  function refreshPage() {
    window.location.reload(false);
  }

  const fetchRoomData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/addRooms", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setDataRoom(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };

  const deleteItem = async (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    await fetch(`http://localhost:5000/deleteRoom?id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const editData = async (id) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      `http://localhost:5000/addRooms?id=${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <Navbar />
      <div className="features">
        <Sidebar />
        <div className="mainRooms">
          <div className="roomsTitle">
            <div className="roomList">
              <h4>Rooms List</h4>
            </div>
            <div className="addNewRooms">
              <button
                onClick={() => {
                  navigate("/addRooms/addNewRooms");
                }}
              >
                Add New
              </button>
            </div>
          </div>
          <div className="tableRoomContainer">
            <table className="tableRoom">
              <tbody className="tbodyRoom">
                <tr>
                  <th></th>
                  <th>No</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Max People</th>
                  <th>Action</th>
                </tr>
                {dataRoom &&
                  dataRoom.map((item, i) => {
                    console.log(item._id);
                    return (
                      <tr key={i}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{i + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.title}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td>{item.maxPeople}</td>
                        <td>
                          <div className="btnControl">
                            <div className="deleteRoomBtn">
                              <button
                                onClick={() => {
                                  let id = item._id;
                                  deleteItem(id);
                                  refreshPage();
                                }}
                              >
                                Delete
                              </button>
                            </div>
                            <div
                              className="editRoomBtn"
                              onClick={() => {
                                editData(item._id);
                                navigate(`/addRooms/addNewRooms/${item._id}`);
                              }}
                            >
                              <button>Edit</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRooms;
