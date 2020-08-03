import React /*{ useContext }*/ from "react";
import logo from "../../images/summercamp.png";
//import userContext from "../../context/userContext";

import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({user}) {
  //const { user } = useContext(userContext);

  return (
    <nav className="navbar bg-white navbar-expand">
      <span className="navbar-brand">
        <Link to="/"><img src={logo} height="10%" width="10%" alt="Summer Camp logo"/></Link>
      </span>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <img src={user.picture} id="profile-photo" alt="profile"/>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
