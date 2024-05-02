import NavLog from "../../components/navbar/navlog";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import "./transactions.css";

const Transactions = () => {
  const [datas, setData] = useState();
// eslint-disable-next-line 
  const [cookies, setCookie] = useCookies(["user"]);

  //   const navigate = useNavigate();
  const emailLogin = cookies.user.email;
  // const url = window.location.href.slice(28);

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

   await fetch("http://localhost:5000/transactions", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log('result', result)
        setData(JSON.parse(result));
        // console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  // console.log("data", datas, typeof datas);

  let dateCount, roomVL, count, totalPrice;
  function generateTable() {
    let table = "<table>";
    table +=
      "<tr><th>No</th><th>Hotel</th><th>Room</th><th>DateFrom</th><th>DateTo</th><th>Price</th><th>Payment Method</th><th>Status</th></tr>";
    datas &&
      datas.forEach((item, i) => {
        dateCount =
          (new Date(item.dateTo) - new Date(item.dateFrom)) /
          (24 * 60 * 60 * 1000);
        roomVL = JSON.parse(item.room);
        count = roomVL.length;
        totalPrice = item.price * count * dateCount;

        table += `<tr><td>${i + 1}</td><td>${item.hotel}</td><td>${
          item.room
        }</td><td>${new Date(item.dateFrom)}</td><td>${new Date(
          item.dateTo
        )}</td><td>$${totalPrice}</td><td>${
          item.selectValue
        }</td><td>Booked</td></tr>`;
      });
    table += "</table>";
    
    try {
      const tableContainer = document.getElementById("table-container");
      if(tableContainer){tableContainer.innerHTML = table};

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  generateTable();

  return (
    <div>
      <NavLog />
      <div className="transactions">
        <div className="titleTrans">
          <h3>Your Transactions</h3>
        </div>
        <div id="table-container" className="tableTrans">
          {/* {generateTable()} */}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
