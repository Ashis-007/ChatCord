import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Profile from "./components/Profile";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import Context from "./context/Context";

// initialize firebase
firebase.initializeApp(firebaseConfig);

const Routes = () => {
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ uid: user.uid });
      } else {
        <Redirect to="/signin" />;
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/:userId" component={Profile} />
        {/* <Route exact path="/" component={} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
