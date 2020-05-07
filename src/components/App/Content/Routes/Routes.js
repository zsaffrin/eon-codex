import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../shared';
import FourOhFour from './404';
import Home from './Home';
import Info from './Info';
import Login from './Login';
import Logout from './Logout';
import Player from './Player';
import Sessions from './Sessions';
import Setup from './Setup';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/info/:collectionId?/:recordId?" component={Info} />
    <Route path="/sessions" component={Sessions} />
    <PrivateRoute path="/setup" authLevel={2}>
      <Setup />
    </PrivateRoute>
    <PrivateRoute path="/player" authLevel={1}>
      <Player />
    </PrivateRoute>
    <Route component={FourOhFour} />
  </Switch>
);

export default Routes;
