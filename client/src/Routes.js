import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import ChatBox from "./components/ChatBox";

import ProtectedRoute from "./helper/ProtectedRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <ProtectedRoute exact path="/chatbox" component={ChatBox} />
      </Switch>
    </Router>
  );
};

export default Routes;
