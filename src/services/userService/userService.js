export const authenticateUser = (token) => {
    //do auth request to backend
    localStorage.setItem("gwt_token", "fake_token");
    return true;
}