import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

import firebase from "./firebase";
import UserContext from "./context/UserContext";
import { CircularProgress } from "@material-ui/core";

const App = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((currentUser) => {
      currentUser
        ? setUser({
            uid: currentUser.uid,
            username: currentUser.displayName,
          })
        : setUser(null);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading) {
    return (
      <div id="loader">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <>
        <Routes />
      </>
    );
  }
};

export default App;
