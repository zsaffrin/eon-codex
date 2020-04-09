import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { LootHome } from '../../loot';

const LootRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <LootHome />
      </Route>
    </Switch>
  );
};

export default LootRoutes;
