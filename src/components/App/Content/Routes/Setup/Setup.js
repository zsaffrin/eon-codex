import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SetupHome from './SetupHome';
import Schema from './Schema';
import Collection from './Collection';
import Tools from './Tools';

const Setup = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact component={SetupHome} />
      <Route path={`${path}/tools`} component={Tools} />
      <Route path={`${path}/schema/:schemaId`} component={Schema} />
      <Route path={`${path}/collection/:collectionId`} component={Collection} />
    </Switch>
  );
};

export default Setup;
