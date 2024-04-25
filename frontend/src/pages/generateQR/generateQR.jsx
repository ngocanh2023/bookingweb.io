import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

import Navbar from "../../components/navbar/Navbar";
import NavLog from "../../components/navbar/navlog";

import "./genQR.css";

function GenerateQR() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
  
  const navigate = useNavigate();
  let getLogin;
  getLogin = cookies?.user.email;
  // console.log("getLogin", getLogin, !getLogin, !!getLogin);

  const fetchQR = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `http://localhost:5000/generateQR?email=${getLogin}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setImage(JSON.parse(result)))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    if (getLogin !== undefined) {
      fetchQR();
    }
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    const response = await fetch(image.qrImage);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrCode.png";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the image file to base64 format
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      // Send the base64 image to the backend
     await fetch("http://localhost:5000/checkQRCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrCode: base64Image }),
      })
        .then((response) => response.text())
        .then((result) => {
          setCookie("user", result, {path: "/"});
          navigate("/");
        })
        .catch((error) => console.error(error));
    };
  };

  return (
    <div>
      {getLogin?<NavLog/>:<Navbar/>}
    <div className="genAll">
      {getLogin && image && (
        <div className="genQRAll">
          <div className="genQR">
            <h1>QR Code Generator</h1>
            <img src={image.qrImage} alt="QR Code" />
            {/* <QRCode value="Your Data Here" /> */}
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      {!getLogin && (
        <div className="QRLogin">
          <div className="infoQR">Do you like to login by QR code?</div>
          <form onSubmit={handleSubmit}>
            <div className="fileQRInp">
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="submitQR">
              <button type="submit">Check QR Code</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default GenerateQR;
