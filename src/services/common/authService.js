import http from "./httpService";
import axios from "axios";
import { apiUrl, tokenKey } from "../../config";
import JwtDecode from "jwt-decode";
import * as userTransformer from "../../transformers/userTransformer";

const authenticateEndpoint = apiUrl + "/Auth/google";

export async function login(idToken) {
  const body = {
    tokenId: idToken
  };
  const { data: response } = await axios.post(authenticateEndpoint, body);
  console.log(JSON.stringify(response.token));
  loginWithJwt(response.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function getCurrentUser() {
  try {
    const jwt = await getJwt();
    const decodedJwt = JwtDecode(jwt);

    return userTransformer.jwtToUser(decodedJwt);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getJwt() {
  const token = localStorage.getItem(tokenKey);
  http.setToken(token);
  return token;
}