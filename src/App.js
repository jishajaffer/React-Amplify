import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Post from "./pages/Post/Post";

function App() {
  return (
    <>
      <Route exact path="/posts/:id" component={Post}></Route>
    </>
  );
}

export default App;
