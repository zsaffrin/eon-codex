import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import Login from "../Login";
import ManageCollection from "../ManageCollection";
import { ManageMenus, ManageMenu } from "../ManageMenus";
import ManageSchema from "../ManageSchema";
import FourOhFour from "../404";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />

      <Route
        path="/playerCharacters"
        render={() => <ManageCollection collectionName="playerCharacters" />}
      />
      <Route
        path="/sessions"
        render={() => <ManageCollection collectionName="sessions" />}
      />
      <Route
        path="/gamingLocations"
        render={() => <ManageCollection collectionName="gamingLocations" />}
      />
      <Route
        path="/places"
        render={() => <ManageCollection collectionName="places" />}
      />

      <Route
        path="/schemas/:id"
        render={({ match }) => <ManageSchema schemaName={match.params.id} />}
      />

      <Route path="/menus" exact render={() => <ManageMenus />} />
      <Route
        path="/menu/:id"
        render={({ match }) => <ManageMenu menuName={match.params.id} />}
      />

      <Route component={FourOhFour} />
    </Switch>
  );
};

export default AppRoutes;
