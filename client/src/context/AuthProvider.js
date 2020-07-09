import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
