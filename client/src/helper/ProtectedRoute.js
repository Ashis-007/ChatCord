import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
            // to={"/signin"}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
