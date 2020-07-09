import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //TODO: Check authentication
  const [isAuthenticated] = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location.state } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
