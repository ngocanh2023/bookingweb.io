import { useNavigate } from "react-router-dom";
import "./navbar.css"

import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, removeCookie ] = useCookies(["user"]);
  const navigate = useNavigate();
  
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    removeCookie("user");
    navigate("/login");
  }

  let getLogin = cookies.user;
  // console.log("getLogin", getLogin, !!getLogin, getLogin?.email)


  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="logoName">
        <span className="logo" onClick={() => {navigate("/")}}>Booking Website</span>
        </div>
        <div>{!!getLogin === false &&
        (<div className="navItems">
          <div className="registerBtn">
          <button className="navButton" onClick={()=>{handleRegister();
            // console.log("Clicked Register!")
            }}>Register</button>
          </div>
          <div className="loginBtn">
          <button className="navButton" onClick={()=>{handleLogin();
            // console.log("Clicked Login!")
            }}>Login</button>
          </div>
        </div>)
        }
        </div>
        <div>{!!getLogin &&
        (<div className="navLogin">
          <div className="navEmail">Welcome {getLogin.email}</div>
          <div className="transBtn">
            <button onClick={() => {navigate("/transactions")}}>Transactions</button>
          </div>
          <div className="logBtn">
          <button className="navButton" onClick={()=>{handleLogout();
            // console.log("Clicked Logout!")
            }}>Logout</button>
          </div>
        </div>)
        }
        </div>

      </div>
    </div>
  )
}

export default Navbar
