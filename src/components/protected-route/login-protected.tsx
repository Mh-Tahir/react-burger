import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const LoginProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const signIn = localStorage.getItem("refreshToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signIn ? (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default LoginProtectedRoute;
