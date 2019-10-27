import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import InfoHome from "../../info";
import ViewCollection from "../../info/ViewCollection";
import ViewRecord from "../../info/ViewRecord";

const InfoRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <InfoHome />
      </Route>
      <Route path={`${path}/:collectionName`} exact>
        <ViewCollection />
      </Route>
      <Route path={`${path}/:collectionName/:recordId`}>
        <ViewRecord />
      </Route>
    </Switch>
  );
};

export default InfoRoutes;
