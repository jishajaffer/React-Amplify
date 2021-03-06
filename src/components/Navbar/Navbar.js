import React, { useContext } from "react";
import logo from "../../images/summercamp.png";
import userContext from "../../context/userContext";
import * as authService from "../../services/common/authService";

import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useContext(userContext);

  const handleSignOut = () => {
    authService.logout();
    window.location.pathname = "/login";
    console.log(window.location.pathname);
  };

  return (
    <nav className="navbar bg-white navbar-expand shadow-sm">
      <span className="navbar-brand">
        <Link to="/"><img src={logo} id="summercamp-logo" alt="Summer Camp logo" /></Link>
      </span>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <div className="dropdown">
            <button className="hidden-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
              <img src={user.picture} id="profile-photo" alt="profile" />
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" type="button" onClick={handleSignOut}>Sign out</button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
