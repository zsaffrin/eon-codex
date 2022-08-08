import { Routes as Router, Route} from 'react-router-dom';

import Campaign from './Campaign';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import FourOhFour from './FourOhFour';

const Routes = () => {  
  return (
    <Router>
      <Route path="/*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/campaign/:campaignKey/*" element={<Campaign />} />

      <Route path="*" element={<FourOhFour />} />
    </Router>
  );
};

export default Routes;
