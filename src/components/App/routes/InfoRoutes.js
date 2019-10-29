import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import InfoHome from "../../info";
import ViewCollection from "../../info/ViewCollection";
import ViewRecord from "../../info/ViewRecord";
import { ViewPlace, ViewPlayerCharacter } from "../../info/views";

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
      <Route path={`${path}/places/:recordId`}>
        <ViewPlace />
      </Route>
      <Route path={`${path}/playerCharacters/:recordId`}>
        <ViewPlayerCharacter />
      </Route>
      <Route path={`${path}/:collectionName/:recordId`}>
        <ViewRecord />
      </Route>
    </Switch>
  );
};

export default InfoRoutes;
