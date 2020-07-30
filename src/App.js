import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// Context
import { UserProvider } from "./context/userContext";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Article from "./pages/Article/Article";
import Create from "./pages/Create/Create";

// Services
import * as authService from "./services/common/authService";

// Components
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState({});

  /*const initState = () => {
    const jwt = auth.getCurrentUser();
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
  };*/

  const initState = async () => {
    authService.getCurrentUser().then(validatedUser => {
      setUser(validatedUser);
    });
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
            path="/articles/new"
            component={(props) => (
              <>
                <Navbar />
                <Create {...props} />
              </>
            )}
          />
          <ProtectedRoute
            exact
            path="/articles/:id"
            component={(props) => (
              <>
                <Navbar />
                <Article {...props} />
              </>
            )}
          />
          <ProtectedRoute
            exact
            path="/articles/:id/edit"
            component={(props) => (
              <>
                <Navbar />
                <Create {...props} />
              </>
            )}
          />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute
            exact
            path="/"
            component={(props) => (
              <>
                <Navbar />
                <Home {...props} />
              </>
            )}
          />
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
