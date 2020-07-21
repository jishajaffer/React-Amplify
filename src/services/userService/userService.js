export const authenticateUser = () => {
  //do auth request to backend
  localStorage.setItem("jwt_token", "fake_token");
  return true;
};

export const getCurrentUser = () => {
  const jwt = localStorage.getItem("jwt_token");
  //do some validation

  return jwt;
};