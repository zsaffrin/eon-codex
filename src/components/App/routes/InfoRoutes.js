import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Info from "../../info";
// import PrivateRoute from "./PrivateRoute";

const InfoRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:categoryId?/:recordId?`} exact>
        <Info />
      </Route>
      {/* <PrivateRoute
        path={`${path}/:categoryId/:recordId/edit`}
        exact
        level="editor"
      >
        <EditRecord />
      </PrivateRoute> */}
    </Switch>
  );
};

export default InfoRoutes;
