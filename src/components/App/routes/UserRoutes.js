import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import { EditPc, Profile } from "../../user";

const UserRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Profile />
      </Route>
      <Route path={`${path}/editPc/:pcId`} exact>
        <EditPc />
      </Route>

      <Redirect to={path} />
    </Switch>
  );
};

export default UserRoutes;
