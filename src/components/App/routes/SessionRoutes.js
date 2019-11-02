import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import SessionsHome from "../../sessions";
import ViewSession from "../../sessions/ViewSession";

const SessionRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <SessionsHome />
      </Route>
      <Route path={`${path}/:sessionId`} exact>
        <ViewSession />
      </Route>
    </Switch>
  );
};

export default SessionRoutes;
