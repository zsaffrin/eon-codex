import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import InfoHome, { EditRecord } from "../../info";
import PrivateRoute from "./PrivateRoute";

const InfoRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:categoryId?/:recordId?`} exact>
        <InfoHome />
      </Route>
      <PrivateRoute
        path={`${path}/:categoryId/:recordId/edit`}
        exact
        level="editor"
      >
        <EditRecord />
      </PrivateRoute>
    </Switch>
  );
};

export default InfoRoutes;
