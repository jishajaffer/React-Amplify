import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";


// Context
import { UserProvider } from "./context/userContext";

// Pages
import Article from "./pages/Article/Article";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/Notfound";

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
        name: "Dexter Morgan",
        permissionLevel: "admin",
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
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={(props) => (
            <>
              <Navbar />
              <Home {...props} />
            </>
          )} />
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
