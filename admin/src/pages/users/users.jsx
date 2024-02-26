import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

import "./users.css";

const Users = () => {
  const [dataRoom, setDataRoom] = useState();

  console.log("dataRoom", dataRoom, typeof dataRoom);

  const fetchRoomData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/searchRoom", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setDataRoom(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };


  useEffect(() => {
    fetchRoomData();
  }, []);

  
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
              {/* <button
                onClick={() => {
                  navigate("/addRooms/addNewRooms");
                }}
              >
                Add New
              </button> */}
            </div>
          </div>
          <div className="tableRoomContainer">
            <table className="tableRoom">
              <tbody className="tbodyRoom">
                <tr>
                  <th>No</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Identity</th>
                </tr>
                {dataRoom &&
                  dataRoom.map((item, i) => {
                    console.log(item._id);
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.fullname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.identity}</td>  
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

export default Users;
