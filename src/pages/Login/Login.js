import React, { useState } from "react";
import logo from "./summercamp.png";
import GoogleLogin from "react-google-login";
import "./Login.css";
import * as auth from "../../services/userService/userService"
const Login = (props) => {

  const handleSuccess = (response) => {
    console.log(response);
    auth.authenticateUser(response.token);
    if (auth.getCurrentUser()) {
      //setUser(response.profileObj);
      window.location = "/home";
    }
  };

  const handleFailure = (response) => {
    console.log(response);
  }
  return (
    <>
      <div className="text-center" id="logoContainer">
        <img
          src={logo}
          className="img-thumbnail"
          height="20%"
          width="20%"
          alt="Logo"
        />
      </div>
      <div className="text-center" id="googleLoginButton">
        <GoogleLogin
          clientId="720340655248-ql1qmrgsuj9267ch3lgar94r2dccqm3r.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
};

export default Login;
