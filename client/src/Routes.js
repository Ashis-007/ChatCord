import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ChatBox from "./components/ChatBox";

import ProtectedRoute from "./helper/ProtectedRoute";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./config/firebaseConfig";

import UserContext from "./context/UserContext";
import AuthContext from "./context/AuthContext";

// initialize firebase
firebase.initializeApp(firebaseConfig);

const Routes = () => {
  const [, setUser] = useContext(UserContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        // TODO: fetch user from DB
        firebase
          .database()
          .ref("/users/" + uid)
          .once("value")
          .then((snapshot) => setUser(snapshot.val()))
          .catch((err) => console.log(err.message));
        setIsAuthenticated(true);
        return <Redirect to="/chatcord" />;
      } else {
        return <Redirect to="/signin" />;
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/chatbox" component={ChatBox} />
      </Switch>
    </Router>
  );
};

export default Routes;
