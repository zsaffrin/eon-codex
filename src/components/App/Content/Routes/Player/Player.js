import React from 'react';
import {
  Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';

import Profile from './Profile';

const Player = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Profile />
      </Route>
      <Redirect to={path} />
    </Switch>
  );
};

export default Player;
