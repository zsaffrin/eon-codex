import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../../../contexts";

const PrivateRoute = ({ children, level, ...rest }) => {
  const { user } = useContext(UserContext);

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
    <Route
      {...rest}
      render={() => (isAuthorized() ? children : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
