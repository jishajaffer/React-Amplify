import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// Context
import { UserProvider } from "./context/userContext";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

// Services
import * as auth from "./services/userService/userService";

// Components
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [user, setUser] = useState({});

  const initState = () => {
    const jwt = auth.getCurrentUser();
    console.log("jwt");
    console.log(jwt);
    if (jwt) {
      setUser({ name: "Ken Miles" });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    initState();
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} />
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
