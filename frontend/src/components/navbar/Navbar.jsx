import { useNavigate } from "react-router-dom";
import "./navbar.css"

import { useCookies } from "react-cookie";

const Navbar = () => {
  // eslint-disable-next-line
  const [cookies, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  let getLogin ="";
  getLogin = cookies?.user;
  console.log("getLogin", getLogin, !!getLogin, getLogin?.email, !getLogin)


  return (
    <div className="navbar">
      {/* <div className="navContainer"> */}
          <div className="logoName" onClick={() => { navigate("/") }}>Booking Website</div>
       
                {/* {!getLogin && */}
            <div className="navItems">
              <div className="navEmail">Welcome</div>
              <div className="registerBtn">
                <button className="navButton" onClick={() => {
                  handleRegister();
                  // console.log("Clicked Register!")
                }}>Register</button>
              </div>
              <div className="loginBtn">
                <button className="navButton" onClick={() => {
                  handleLogin();
                  // console.log("Clicked Login!")
                }}>Login</button>
              </div>
            </div>
          {/* } */}
        {/* </div> */}
        
    </div>
  )
}

export default Navbar
