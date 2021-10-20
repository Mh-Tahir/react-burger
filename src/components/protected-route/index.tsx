import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const signIn = localStorage.getItem("refreshToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
