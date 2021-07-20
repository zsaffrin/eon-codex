import { Route, Switch } from 'react-router-dom';

import { useUser } from '../../../../hooks';
import FourOhFour from './404';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import Logout from './Logout';
import Setup from './Setup';

const Routes = () => {
  const [user] = useUser();
  
  return (
    <Switch>
      <Route path="/" exact component={user ? Dashboard : Home} />

      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />

      <Route path="/setup" component={Setup} />
      
      <Route component={FourOhFour} />
    </Switch>
  );
};

export default Routes;
