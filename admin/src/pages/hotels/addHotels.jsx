import React, { useState, useEffect } from "react";

import {useNavigate} from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

import "./addHotels.css";

const Admin = () => {
  const [dataHotel, setDataHotel] = useState([]);

  // console.log("dataHotel", dataHotel);
  
  const navigate = useNavigate();

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

  const deleteItem = async (id) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(`http://localhost:5000/delete?id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    fetchData();
  };

  
    useEffect(() => {
      fetchData();
    }, []);
  
    const editData = async(id) => {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };
  
      await fetch(`http://localhost:5000/hotels/newEditProduct?id=${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {})
        .catch((error) => console.log("error", error));
  
    }

  return (
    <div>
      <Navbar />
      <div className="features">
        <Sidebar />
        <div className="mainContainer">
          <div className="hotelTitle">
            <div className="hotelList">
              <h4>Hotels List</h4>
            </div>
            <div className="addNew">
              <button onClick={() => {navigate("/hotels/newProduct")}}>Add New</button>
            </div>
          </div>
          <div className="tableContainer" id="table-hotelContainer">
            <table className="tableHotel">
              <tbody className="tbodyHotel">
                <tr>
                  <th>
                    {/* <input type="checkbox" /> */}
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
                {dataHotel.map((item, key) => {
                  let itemID = item._id;
                  return (
                    <tr key={key}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>
                        <div className="btnControl">
                        <div className="deleteBtn">
                        <button
                          onClick={() => {
                            deleteItem(itemID);
                          }}
                        >
                          Delete
                        </button>
                        </div>
                        <div className="editBtn" onClick={() => {navigate(`/hotels/newProduct/${itemID}`); editData(itemID)}}><button>Edit</button></div>
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

export default Admin;
