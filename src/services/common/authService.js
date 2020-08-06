import http from "./httpService";
import axios from "axios";
import { apiUrl, tokenKey } from "../../config";
import JwtDecode from "jwt-decode";
import * as userTransformer from "../../transformers/userTransformer";

const authenticateEndpoint = apiUrl + "/Auth/google";

export async function login(idToken, googleUser) {
  const body = {
    tokenId: idToken
  };
  const { data: response } = await axios.post(authenticateEndpoint, body);
  console.log(JSON.stringify(response.token));
  loginWithJwt(response.token);
  storeGoogleUser(googleUser);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("google_user");
}

const storeGoogleUser = (googleUser) => {
  localStorage.setItem("google_user", JSON.stringify(googleUser));
};

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function getCurrentUser() {
  try {
    http.setRequestInterceptors();
    const jwt = getJwt();
    const decodedJwt = JwtDecode(jwt);
    const googleUser = JSON.parse(localStorage.getItem("google_user"));
    return {...userTransformer.jwtToUser(decodedJwt), ...googleUser};
  } catch (err) {
    return null;
  }
}

function getJwt() {
  const token = localStorage.getItem(tokenKey);
  http.setToken(token);
  return token;
}