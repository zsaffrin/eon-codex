import { Route, Switch } from 'react-router-dom';

import FourOhFour from './404';
import Home from './Home';
import Logout from './Logout';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/logout" exact component={Logout} />
      
      <Route component={FourOhFour} />
    </Switch>
  );
};

export default Routes;
