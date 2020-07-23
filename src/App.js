import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Article from "./pages/Article/Article";

// Context
import { UserProvider } from "./context/userContext";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

// Services
import * as auth from "./services/userService/userService";

// Components
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState({});

  const initState = () => {
    const jwt = auth.getCurrentUser();
    console.log("jwt");
    console.log(jwt);
    if (jwt) {
      setUser({
        name: "Ken Miles",
        isAdmin: true,
        profilePhoto:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9iUQ5TVznynSsqOdajd-zXGY5hgNWOD9LWg&usqp=CAU",
      });
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
          <ProtectedRoute
            exact
            path="/article/:id"
            component={(props) => (
              <>
                <Navbar />
                <Article {...props} />
              </>
            )}
          />
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/home" component={(props) => (
              <>
                <Navbar />
                <Home {...props} />
              </>
            )} />
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
