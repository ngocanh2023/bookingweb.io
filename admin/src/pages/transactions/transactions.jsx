import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/navbar"
import Sidebar from "../../components/sidebar/sidebar"

import "./transactions.css";

const Transactions = () => {
  const [datas, setData] = useState();
  let [plus, setPlus] = useState(1);
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["user"]);

//   const navigate = useNavigate();

  const emailLogin = cookies.user.email;

  let countPage;
  let data;
  if (datas) {
    countPage = datas.totalPage;
    // console.log("data", data);
  }

  const fetchData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: emailLogin,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/admin?page=${plus}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
        // console.log("datas", datas, typeof datas);
      })
      .catch((error) => console.log("error", error));
  };
  let dateCount, roomVL, count, totalPrice;
  let userArray = [];

  function generateTable() {
    data = datas.results;
    // countOrder = datas.results.length;

    let table = "<table>";
    table +=
      "<tr><th>No</th><th>Hotel</th><th>User</th><th>Room</th><th>DateFrom</th><th>DateTo</th><th>Price</th><th>Payment Method</th><th>Status</th></tr>";

    for (const i in data) {
      const item = data[i];
      const j = Number(i);

      userArray.push(data[j].email);
      dateCount =
        (new Date(item.dateTo) - new Date(item.dateFrom)) /
        (24 * 60 * 60 * 1000);
      roomVL = JSON.parse(item.room);
      count = roomVL.length;
      totalPrice = item.price * count * dateCount;

      table += `<tr><td>${j + 1}</td><td>${item.hotel}</td><td>${
        item.fullname
      }</td><td>${item.room}</td>
      <td>${new Date(item.dateFrom)}</td><td>${new Date(
        item.dateTo
      )}</td><td>$${totalPrice}</td>
      <td>${item.selectValue}</td><td>Check In</td></tr>`;
    }

    table += "</table>";

    try {
      const tableContainer = document.getElementById("table-container");
      if (tableContainer) {
        tableContainer.innerHTML = table;
      }
    } catch (error) {
      console.error(error);
    }
  }
    useEffect(() => {
      fetchData()
      // eslint-disable-next-line
    }, []);

  if (datas) {
    generateTable();
  }

  return (
    <div>
      <div className="adminPage">
        <Navbar/>
        <div className="features">
          <Sidebar />
          <div className="mainContainer">
            <div className="transactionTotal">
              <h3>Transactions Lists</h3>
              <div className="transactionInfo">
                <div id="table-container"></div>
                <div className="countBtn">
                  <div className="minusBtn">
                    <button
                      onClick={() => {
                        if (plus < countPage) {
                          setPlus(plus + 1);
                          fetchData();
                        }
                      }}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="countNo">
                    <div className="count1">1 ...</div>
                    <div className="countTotal">{countPage}</div>
                  </div>
                  <div className="plusBtn">
                    <button
                      onClick={() => {
                        if (plus > 1) {
                          setPlus(plus - 1);
                          fetchData();
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
