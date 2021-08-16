import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Collection from './Collection';

const Setup = () => {
  const { url } = useRouteMatch();
  
  return (
    <Switch>
      <Route path={url} exact component={Home} />
      <Route path={`${url}/collection/:collectionId`} component={Collection} />

      <Redirect to={url} />
    </Switch>
  );
};

export default Setup;
