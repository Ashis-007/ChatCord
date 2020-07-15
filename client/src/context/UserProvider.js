import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
