import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import InfoHome from "../../info";
import ViewCollection from "../../info/ViewCollection";
import ViewRecord from "../../info/ViewRecord";
import {
  ViewGroup,
  ViewPerson,
  ViewPlace,
  ViewPlayerCharacter
} from "../../info/views";

const InfoRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:categoryId?/:recordId?`} exact>
        <InfoHome />
      </Route>
    </Switch>
  );
};

export default InfoRoutes;
