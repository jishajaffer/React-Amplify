import React, { useContext } from "react";
import logo from "../../images/summercamp.png";
import userContext from "../../context/userContext";

import "./Navbar.css"

function Navbar() {
  const { user } = useContext(userContext);

  return (
    <nav className="navbar navbar-expand">
      <a className="navbar-brand">
        <img src={logo} height="10%" width="10%" alt="Summer Camp logo"/>
      </a>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <img src={user.profilePhoto} id="profile-photo" alt="profile photo"/>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
