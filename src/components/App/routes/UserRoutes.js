import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import { Profile } from "../../user";

const UserRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Profile />
      </Route>

      <Redirect to={path} />
    </Switch>
  );
};

export default UserRoutes;
