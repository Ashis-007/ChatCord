import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import firebase from "firebase/app";
import "firebase/auth";

import Context from "../context/Context";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true); // prop for Snackbar

  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // reset state
        setEmail("");
        setPassword("");
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

  return (
    <div className="SignInForm">
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            variant="standard"
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>
      {errorMsg()}
    </div>
  );
};

export default SignInForm;
