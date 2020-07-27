import React, { useContext } from "react";
import logo from "../../images/summercamp.png";
import userContext from "../../context/userContext";

import "./Navbar.css";

function Navbar() {
  const { user } = useContext(userContext);

  return (
    <nav className="navbar navbar-expand">
      <span className="navbar-brand">
        <img src={logo} height="10%" width="10%" alt="Summer Camp logo"/>
      </span>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <img src={user.profilePhoto} id="profile-photo" alt="profile"/>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
