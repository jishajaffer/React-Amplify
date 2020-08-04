import axios from "axios";
import { tokenKey } from "../../config";

function setToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
}

function setRequestInterceptors() {
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem("google_user");
      window.location = "/login";
      return Promise.reject(error);
    }
    return error;
  });
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
  setRequestInterceptors
};