import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { useCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import SessionsHome from './SessionsHome';
import ViewSession from './ViewSession';

const Sessions = () => {
  const { path } = useRouteMatch();
  const [sessions, sessionsLoading] = useCollection('sessions');

  return sessionsLoading ? <Loading /> : (
    <Switch>
      <Route path={path} exact>
        <SessionsHome sessions={sessions} />
      </Route>
      <Route path={`${path}/:sessionId`} exact>
        <ViewSession sessions={sessions} />
      </Route>
    </Switch>
  );
};

export default Sessions;
