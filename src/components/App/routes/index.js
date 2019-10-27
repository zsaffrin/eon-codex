import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../../Home";
import Login from "../../Login";
import InfoRoutes from "./InfoRoutes";
import SettingsRoutes from "./SettingsRoutes";
import FourOhFour from "../../404";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />

      <PrivateRoute path="/settings">
        <SettingsRoutes />
      </PrivateRoute>

      <Route path="/info">
        <InfoRoutes />
      </Route>

      <Route component={FourOhFour} />
    </Switch>
  );
};

export default AppRoutes;
