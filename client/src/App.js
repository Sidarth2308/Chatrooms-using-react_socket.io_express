//jshint  esversion: 6
import React from "react";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

const App = () =>{
/*
  When the user first comes to the page, he will be greated with the "Join" component. Here he will pass his data to the login window.
  Then we will pick up that data and pass it to the "Chat" component using the query String.
*/
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>)
};

export default App;
