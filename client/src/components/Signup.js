import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Context from "../context/Context";

import "../css/Signup.css";

const SignUpForm = (props) => {
  // Context
  const [user, setUser] = useContext(Context);
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  // State
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true); // prop for Snackbar

  const database = firebase.database();

  const handleSubmit = (e) => {
    e.preventDefault();

    // authenticate using firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setError("");
        setSuccess(true);

        const uid = user.uid;

        // TODO: ✔ save user in DB and add user to context
        database
          .ref("users/" + uid)
          .set({
            uid,
            username,
            email,
          })
          .then((response) => console.log(response))
          .catch((err) => console.log(err.message));
        setUser({ uid, username, email });

        // TODO: ✔ change isAuthenticated
        setIsAuthenticated(true);

        // Redirect to chatbox
        props.history.push("/chatbox");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const successMsg = () => {
    if (success) {
      return (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
        >
          <Alert onClose={handleClose} severity="success">
            Account created successfully!
          </Alert>
        </Snackbar>
      );
    }
  };

  const errorMsg = () => {
    if (error) {
      return (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
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
      setUsername("");
      setPassword("");
      setError("");
      setSuccess(false);
      setOpen(true);
    };
  }, []);

  return (
    <div className="form__container">
      <h2 className="form__heading">Register</h2>
      <form>
        <div className="">
          <label className="">Username</label>
          <input
            className=""
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            placeholder="Username"
          />
        </div>
        <div className="">
          <label className="text-light">Email</label>
          <input
            className=""
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label className="text-light">Password</label>
          <input
            className=""
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Password"
          />
        </div>
        <button onClick={handleSubmit} className="btn submit">
          Sign Up
        </button>
      </form>
      <div className="other">
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
