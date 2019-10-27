import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useCurrentUser } from "../../../hooks/authHooks";

const PrivateRoute = ({ children, level, ...rest }) => {
  const [user, userLoaded] = useCurrentUser();

  const isAuthorized = () => {
    if (level === "loggedIn" && user) {
      return true;
    }
    if (level === "editor" && user && user.canEdit) {
      return true;
    }
    return false;
  };

  return (
    userLoaded && (
      <Route
        {...rest}
        render={() => (isAuthorized() ? children : <Redirect to="/" />)}
      />
    )
  );
};

export default PrivateRoute;
