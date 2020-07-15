import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ChatBox from "./components/ChatBox";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/chatbox" component={ChatBox} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
