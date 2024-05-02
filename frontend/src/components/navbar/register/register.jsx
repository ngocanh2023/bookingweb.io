import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import Navbar from "../Navbar";
import NavLog from "../navlog";
import {  useCookies } from "react-cookie";

import "./register.css";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullname] = useState();
  const [phoneNumber, setPhonenumber] = useState();
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [checkError, setCheckError] = useState("");

  // console.log("checkError", checkError);

  const navigate = useNavigate();
// eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["user"]);
  let getLogin = cookies?.user;

  const validPassword = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      setErrorMessage("Strong Password!");
      setPassword(value);
    } else {
      setErrorMessage("Need more 6 characters!");
    }
  };

  const handleRegister = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          navigate("/login");
        } else {
          console.log("message", result.message);
          setCheckError(result.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {getLogin?<NavLog />:<Navbar/>}
      <div className="register">
        <div className="title">REGISTER</div>
        <div className="username">
          <input
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="password"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="At least 6 or more characters"
            // "Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            onChange={(e) => {
              validPassword(e.target.value);
            }}
          />
        </div>
        {errorMessage === "" ? null : (
          <div
            className="errorMessage"
            style={{ fontWeight: "bold", color: "red", fontSize: "small" }}
          >
            {errorMessage}
          </div>
        )}
        <div className="fullname">
          <input
            placeholder="fullname"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="phoneNumber">
          <input
            placeholder="phoneNumber"
            onChange={(e) => {
              setPhonenumber(e.target.value);
            }}
          />
        </div>
        <div className="email">
          <input
            type="email"
            placeholder="abc@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {checkError && (
            <div style={{ fontWeight: "bold", color: "red", fontSize: "small" }}>{checkError}</div>
          )}
        </div>
        <div className="submit">
          <button
            onClick={() => {
              handleRegister();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
