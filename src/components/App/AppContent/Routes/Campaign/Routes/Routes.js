import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Setup from './Setup';

const Routes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={Home} />
      <Route path={`${path}/setup`} component={Setup} />
    </Switch>
  );
};

export default Routes;
