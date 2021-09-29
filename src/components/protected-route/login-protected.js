import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const LoginProtectedRoute = ({ children, ...rest }) => {
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

LoginProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProtectedRoute;
