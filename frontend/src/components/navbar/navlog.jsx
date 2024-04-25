import { useNavigate } from "react-router-dom";
import "./navbar.css";

import { useCookies } from "react-cookie";

const NavLog = () => {
  // eslint-disable-next-line
  const [cookies, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };
  //   const handleLogin = () => {
  //     navigate("/login");
  //   };
  const handleLogout = () => {
    removeCookie("user");
    navigate("/login");
    window.location.reload();
  };

  let getLogin = "";
  getLogin = cookies?.user;
  console.log("getLogin", getLogin, !getLogin, !!getLogin)
  // const url = window.location.href.slice(22);
  // console.log('url', url)

  return (
    <div className="navbar">
      {getLogin && (
        <div className="navContainer">
          <div
            className="logoName"
            onClick={() => {
              navigate(`/${getLogin.email}`);
            }}
          >
            Booking Website
          </div>

          <div className="navLogin">
            <div className="navEmail">Welcome {getLogin.email}</div>
            <div className="transBtn">
              <button
                onClick={() => {
                  navigate(`/transactions/${getLogin.email}`);
                }}
              >
                Transactions
              </button>
            </div>
            <div className="registerBtn">
              <button
                className="navButton"
                onClick={() => {
                  handleRegister();
                }}
              >
                Register
              </button>
            </div>
            <div className="logBtn">
              <button
                className="navButton"
                onClick={() => {
                  handleLogout();
                  // console.log("Clicked Logout!")
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavLog;
