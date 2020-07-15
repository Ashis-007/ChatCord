import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import firebase from "../firebase";

import UserContext from "../context/UserContext";

import "../css/Signup.css";

const SignUpForm = (props) => {
  // Context
  const [, setUser] = useContext(UserContext);

  // State
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true); // prop for Snackbar

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { user: currentUser } = await firebase.signup(
        email,
        password,
        username
      );

      await firebase.changeDisplayName(username);

      if (currentUser) {
        setError("");
        setSuccess(true);

        const uid = currentUser.uid;
        await firebase.storeUser(uid, username, email);
        setUser({ uid, username, email });
      }
    } catch (error) {
      console.log(error);
    }
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

  const signUpForm = () => {
    return (
      <div className="form__container">
        <h2 className="form__heading">Register</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit" onClick={handleSignup} className="btn submit">
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

  return (
    <>
      {signUpForm()}
      {successMsg()}
      {errorMsg()}
    </>
  );
};

export default SignUpForm;
