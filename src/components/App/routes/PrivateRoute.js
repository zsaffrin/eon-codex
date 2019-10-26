import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useCurrentUser } from "../../../hooks/authHooks";

const PrivateRoute = ({ children, ...rest }) => {
  const [user, userLoaded] = useCurrentUser();

  return (
    userLoaded && (
      <Route {...rest} render={() => (user ? children : <Redirect to="/" />)} />
    )
  );
};

export default PrivateRoute;
