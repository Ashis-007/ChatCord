import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import firebase from "../firebase";

import UserContext from "../context/UserContext";

import "../css/Signin.css";

const SignInForm = (props) => {
  // Context
  const [user, setUser] = useContext(UserContext);

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true); // prop for Snackbar

  // const database = firebase.database();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await firebase.signin(email, password);
      const uid = currentUser.uid;
      const email = currentUser.email;
      const username = currentUser.displayName;
      setUser({ uid, email, username });

      props.history.push("/chatbox");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      console.log(user);
      // reset state
      setEmail("");
      setPassword("");
      setError("");
      setOpen(true);
    };
  }, []);

  const signInForm = () => {
    return (
      <div className="form__container">
        <h2 className="form__heading">Login</h2>

        <form onSubmit={handleSignin}>
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
          <button type="submit" onClick={handleSignin} className="btn submit">
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

  if (!user) {
    return (
      <>
        {signInForm()}
        {errorMsg()}
      </>
    );
  } else {
    return <Redirect to="/chatbox" />;
  }
};

export default SignInForm;
