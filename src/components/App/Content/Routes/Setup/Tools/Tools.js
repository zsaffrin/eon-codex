import React from 'react';
import {
  Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';

import UpdateFieldValues from './UpdateFieldValues';

const Tools = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/updateFieldValues`} component={UpdateFieldValues} />
      <Redirect to="/setup" />
    </Switch>
  );
};

export default Tools;
