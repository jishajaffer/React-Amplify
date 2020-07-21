import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Post from "./pages/Post/Post";

function App() {
  return (
    <><BrowserRouter>
      <Route exact path="/post/:id" component={Post}></Route>
    </BrowserRouter></>
  );
}

export default App;
