import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Profile from "./components/Profile";
import ChatBox from "./components/ChatBox";

import UserProvider from "./context/UserProvider";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
        </UserProvider>
      </Switch>
    </Router>
  );
};

export default Routes;
