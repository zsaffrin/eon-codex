import { Route, Switch } from 'react-router-dom';

import FourOhFour from './404';

const Routes = () => {
  return (
    <Switch>
      <Route component={FourOhFour} />
    </Switch>
  );
};

export default Routes;
