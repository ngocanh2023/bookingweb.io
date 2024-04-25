import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";

import "./admin.css";

const Admin = () => {
  const [datas, setData] = useState();
  let [plus, setPlus] = useState(1);
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["user"]);

  //   const navigate = useNavigate();
  console.log("datas", datas, typeof datas);
  let emailLogin = "";
  if(cookies){
    emailLogin = cookies.user.email;
  }

  let countPage;
  let data;
  if (datas) {
    countPage = datas.totalPage;
    console.log("data", data);
  }

  const fetchData = async () => {
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

    await fetch(`http://localhost:5000/admin?page=${plus}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  let dateCount, roomVL, count, totalPrice;
  let countUser;
  let userArray = [];
  let uniqueArray = [];

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
      uniqueArray = [...new Set(userArray)];
      countUser = uniqueArray.length;

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
      <td>${item.selectValue}</td><td>Booked</td></tr>`;
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
    }, [])

  if (datas) {
    generateTable();
  }

  return (
    <div>
      {emailLogin ? (<div className="adminPage">
        <Navbar />
        <div className="features">
          <Sidebar />

          <div className="mainContainer">
            <div className="mainContent">
              <div className="totalCount">
                <div className="userTotal">
                  <div className="userContent">
                    <h3>USERS</h3>
                    <div>{countUser}</div>
                  </div>
                  <div className="userIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-square"
                      viewBox="0 0 16 16"
                      color="red"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="totalOrder">
                <div className="orderContent">
                  <h3>ORDERS</h3>
                  <div>100</div>
                </div>
                <div className="orderIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                    color="orange"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </div>
              </div>
              <div className="totalEarnings">
                <div className="earningsContent">
                  <h3>EARNINGS</h3>
                  <div>100</div>
                </div>
                <div className="earningsIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-currency-exchange"
                    viewBox="0 0 16 16"
                    color="green"
                  >
                    <path d="M0 5a5 5 0 0 0 4.027 4.905 6.5 6.5 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05q-.001-.07.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.5 3.5 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98q-.004.07-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5m16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674z" />
                  </svg>
                </div>
              </div>
              <div className="totalBalance">
                <div className="balanceContent">
                  <h3>BALANCE</h3>
                  <div>100</div>
                </div>
                <div className="balanceIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bank"
                    viewBox="0 0 16 16"
                    color="purple"
                  >
                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="transactionTotal">
              <h3>Latest Transactions</h3>
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
      </div>):(<div><h1>Please login first</h1></div>)}
    </div>
  );
};

export default Admin;
