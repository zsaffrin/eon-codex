import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Collection from './Collection';
import Schema from './Schema';

const Setup = () => {
  const { url } = useRouteMatch();
  
  return (
    <>
      <Header />
      <Switch>
        <Route path={url} exact component={Home} />
        <Route path={`${url}/collection/:collectionId`} component={Collection} />
        <Route path={`${url}/schema/:schemaId`} component={Schema} />

        <Redirect to={url} />
      </Switch>
    </>
  );
};

export default Setup;
