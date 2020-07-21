import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";


// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </>
  );
}

export default App;
