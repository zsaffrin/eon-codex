import { Route, Switch } from 'react-router-dom';

import FourOhFour from './404';
import Home from './Home';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      
      <Route component={FourOhFour} />
    </Switch>
  );
};

export default Routes;
