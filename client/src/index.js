import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import UserProvider from "./context/UserProvider";
import App from "./App";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
