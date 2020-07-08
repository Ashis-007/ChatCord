import React, { useState } from "react";
import Context from "./Context";

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Context.Provider value={[isAuthenticated, setIsAuthenticated]}>
      {props.children}
    </Context.Provider>
  );
};

export default AuthProvider;
