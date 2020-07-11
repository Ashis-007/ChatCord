import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //TODO: Check authentication
  const [user, setUser] = useContext(UserContext);
  const [isAuthenticated] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
