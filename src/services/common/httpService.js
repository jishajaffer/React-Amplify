import axios from "axios";

function setToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};