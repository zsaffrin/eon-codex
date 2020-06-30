import React from 'react';
import {
  Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';

import UpdateFieldValues from './UpdateFieldValues';
import CopyLinkString from './CopyLinkString';

const Tools = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/updateFieldValues`} component={UpdateFieldValues} />
      <Route path={`${path}/copyLinkString`} component={CopyLinkString} />
      <Redirect to="/setup" />
    </Switch>
  );
};

export default Tools;
