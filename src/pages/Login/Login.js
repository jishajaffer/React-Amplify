import React from "react";
import logo from "../../images/summercamp.png";
import GoogleLogin from "react-google-login";
import "./Login.css";
import * as auth from "../../services/userService/userService";
const Login = (props) => {

  const handleSuccess = (response) => {
    console.log(response);
    auth.authenticateUser(response.token);
    if (auth.getCurrentUser()) {
      props.history.push("/home");
    }
  };

  const handleFailure = (response) => {
    console.log(response);
  };
  return (
    <div className="login-center">
      <div className="row justify-content-center mx-auto">
        <div className="col-md-6">
          <div class="card bg-white">
            <div class="card-body">
              <div className="text-center">
                <img
                  src={logo}
                  className="pt-5"
                  height="50%"
                  width="50%"
                  alt="Logo"
                />
              </div>
              <div className="text-center" id="googleLoginButton">
                <GoogleLogin
                  clientId="720340655248-ql1qmrgsuj9267ch3lgar94r2dccqm3r.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={handleSuccess}
                  onFailure={handleFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
