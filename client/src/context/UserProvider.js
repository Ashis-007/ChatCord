import React, { useState } from "react";
import Context from "./Context";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    uid: "",
  });

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
};

export default UserProvider;
