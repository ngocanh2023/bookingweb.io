import "../../pages/admin.css"

import { useNavigate } from "react-router-dom"; 

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div><nav>
    <h3 className="navAdmin" onClick={() => {navigate("/admin")}}>ADMIN PAGE</h3>
  </nav></div>
  )
};

export default Nav;
