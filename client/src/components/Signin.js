import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Context from "../context/Context";

import "../css/Signin.css";

const SignInForm = (props) => {
  // Context
  const [user, setUser] = useContext(Context);
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true); // prop for Snackbar

  const database = firebase.database();

  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const uid = user.uid;

        // TODO: ✔ fetch user from DB
        // TODO: ✔ add user to context
        // TODO: ✔ change isAuthenticated
        // TODO: redirect to chatbox
        database
          .ref("/users/" + uid)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              console.log(snapshot.val());
              const username = snapshot.val().username;
              const email = snapshot.val().email;
              setUser({ uid, username, email });
              setIsAuthenticated(true);
              props.history.push("/chatbox");
            } else {
              console.log(snapshot);
            }
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const errorMsg = () => {
    if (error) {
      return (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      );
    }
  };

  useEffect(() => {
    return () => {
      // reset state
      setEmail("");
      setPassword("");
      setError("");
      setOpen(true);
    };
  }, []);

  return (
    <div className="form__container">
      <h2 className="form__heading">Login</h2>

      <form>
        <div className="">
          <label className="">Email</label>
          <input
            className=""
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Email"
          />
        </div>
        <div className="">
          <label className="">Password</label>
          <input
            className=""
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin} className="btn submit">
          Login
        </button>
      </form>
      <div className="other">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
