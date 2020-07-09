import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Profile from "./components/Profile";
import ChatBox from "./components/ChatBox";

import ProtectedRoute from "./helper/ProtectedRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/signin" component={SignInForm} />
        <ProtectedRoute exact path="/chatbox" component={ChatBox} />
      </Switch>
    </Router>
  );
};

export default Routes;
