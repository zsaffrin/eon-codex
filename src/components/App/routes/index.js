import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../Home';
import Login from '../../Login';
import InfoRoutes from './InfoRoutes';
import SettingsRoutes from './SettingsRoutes';
import SessionRoutes from './SessionRoutes';
import UserRoutes from './UserRoutes';
import LootRoutes from './LootRoutes';
import FourOhFour from '../../404';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />

    <PrivateRoute path="/settings" level="editor">
      <SettingsRoutes />
    </PrivateRoute>

    <PrivateRoute path="/info" level="loggedIn">
      <InfoRoutes />
    </PrivateRoute>

    <PrivateRoute path="/sessions" level="loggedIn">
      <SessionRoutes />
    </PrivateRoute>

    <PrivateRoute path="/user" level="loggedIn">
      <UserRoutes />
    </PrivateRoute>

    <PrivateRoute path="/loot" level="loggedIn">
      <LootRoutes />
    </PrivateRoute>

    <Route component={FourOhFour} />
  </Switch>
);

export default AppRoutes;
