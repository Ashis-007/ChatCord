import React, { useState } from "react";
import Context from "./Context";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
};

export default UserProvider;
