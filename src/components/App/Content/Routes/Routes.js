import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FourOhFour from './404';
import Home from './Home';
import Collection from './Collection';
import Sessions from './Sessions';
import Setup from './Setup';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/sessions" component={Sessions} />
    <Route path="/setup" component={Setup} />
    <Route path="/:collectionId" component={Collection} />
    <Route component={FourOhFour} />
  </Switch>
);

export default Routes;
