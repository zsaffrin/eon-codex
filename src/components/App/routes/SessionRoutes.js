import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import SessionsHome from "../../sessions";
import ViewSession from "../../sessions/ViewSession";
import EditLootItem from "../../sessions/ViewSession/EditLootItem";

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
      <PrivateRoute
        path={`${path}/editLootItem/:recordId`}
        exact
        level="editor"
      >
        <EditLootItem />
      </PrivateRoute>
    </Switch>
  );
};

export default SessionRoutes;
