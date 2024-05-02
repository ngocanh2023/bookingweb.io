import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import NavLog from "../navlog";
import {  useCookies } from "react-cookie";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkError, setCheckError] = useState("");
  
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["user"]);
  let getLogin = cookies?.user;
  
  const navigate = useNavigate();
  // console.log("cookies.user", cookies.user)
  // console.log("email", email);
  // console.log("password", password);
  // console.log("checkError", checkError);

  const handleLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const getResult = JSON.parse(result);
        // console.log('result', JSON.parse(result));
        if(email !== "admin@admin"){
          if (getResult.success) {        
            setCookie("user", raw, {path: "/"});
            navigate(`/${email}`);
          } else {
            setCheckError(getResult.messages);
          }
        } else {
          if(getResult.success){
            setCookie("user", raw, {path: "/"});
            window.location.href="http://localhost:3002/admin";
          } else {
            setCheckError(getResult.messages);
          }
        }
      })
      .catch((error) => {
        console.log("message", error);
      });
  };

  return (
    <div>
      {getLogin?<NavLog/>:<Navbar/>}
      <div className="login">
        <div className="title1">LOG IN</div>
        <div className="email1">
          <input
            placeholder="abc@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password1">
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="checkError">{checkError && <div style={{ fontWeight: "bold", color: "red", fontSize: "medium" }}>{checkError}</div>}</div>
        <div className="submit1">
          <button
            onClick={() => {
              handleLogin();
            }}
          >
            Submit
          </button>
        </div>
        <div className="loginQR" onClick={() => {window.location.replace("http://localhost:3000/generateQR")}}>Login by QR?</div>
      </div>
    </div>
  );
};

export default Login;
