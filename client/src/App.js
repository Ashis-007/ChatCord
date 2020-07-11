import React, { useEffect, useContext } from "react";
import { useHistory, withRouter, BrowserRouter } from "react-router-dom";
import "./App.css";

import Routes from "./Routes";

function App(props) {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
