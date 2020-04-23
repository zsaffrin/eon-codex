import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FourOhFour from './404';
import Home from './Home';
import Info from './Info';
import Sessions from './Sessions';
import Setup from './Setup';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/info" component={Info} />
    <Route path="/sessions" component={Sessions} />
    <Route path="/setup" component={Setup} />
    <Route component={FourOhFour} />
  </Switch>
);

export default Routes;
