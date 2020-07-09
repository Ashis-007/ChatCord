import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context/Context";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //TODO: Check authentication
  const [isAuthenticated] = useContext(Context);
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
