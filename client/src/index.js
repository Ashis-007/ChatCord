import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import UserProvider from "./context/UserProvider";
import AuthProvider from "./context/AuthProvider";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
