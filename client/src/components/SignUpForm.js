import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import firebase from "firebase/app";
import "firebase/auth";
import { Redirect } from "react-router-dom";
import Context from "../context/Context";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true); // prop for Snackbar

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

        // reset state
        setEmail("");
        setUsername("");
        setPassword("");

        console.log(user);
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
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
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
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      );
    }
  };

  return (
    <div className="SignUpForm">
      <Typography variant="h2">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            variant="standard"
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            type="text"
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "40%" }}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
      {errorMsg()}
      {successMsg()}
    </div>
  );
};

export default SignUpForm;
