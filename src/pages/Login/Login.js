import React from "react";
import logo from "../../images/summercamp.png";
import GoogleLogin from "react-google-login";
import "./Login.css";
import * as authService from "../../services/common/authService";

const Login = (props) => {
  const { state } = props.location;

  const handleSuccess = async (response) => {
    console.log(JSON.stringify(response.profileObj));
    console.log(response.wc["id_token"]);
    const { givenName, familyName, email, imageUrl } = response.profileObj;
    const googleUser = {
      firstName: givenName,
      lastName: familyName,
      emailAddress: email,
      picture: imageUrl,
    };

    try {
      await authService.login(response.wc["id_token"], googleUser);
      if (state) {
        const pathname = state.from.pathname;
        window.location = pathname;
      } else {
        window.location = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFailure = (response) => {
    console.log(response);
  };
  return (
    <div className="login-center">
      <div className="row justify-content-center mx-auto">
        <div className="col-md-6">
          <div className="card bg-white">
            <div className="card-body">
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
