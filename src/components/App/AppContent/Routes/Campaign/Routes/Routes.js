import { useRouteMatch, Switch, Redirect, Route } from 'react-router-dom';

import Home from './Home';
import Characters from './Characters';
import Info from './Info';
import Players from './Players';
import Sessions from './Sessions';
import Setup from './Setup';

const Routes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={Home} />

      <Route path={`${path}/info/:categoryId?`} component={Info} />
      <Route path={`${path}/characters/:characterId?`} component={Characters} />
      <Route path={`${path}/players/:playerId?`} component={Players} />
      <Route path={`${path}/sessions/:sessionId?`} component={Sessions} />
      <Route path={`${path}/setup`} component={Setup} />

      <Redirect to={path} />
    </Switch>
  );
};

export default Routes;
