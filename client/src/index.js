import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import UserProvider from "./context/UserProvider";
import AuthProvider from "./context/AuthProvider";
import App from "./App";

ReactDOM.render(
  <UserProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </UserProvider>,
  document.getElementById("root")
);
