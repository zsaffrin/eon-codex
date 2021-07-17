import { Redirect } from 'react-router-dom';

import { useFirebase } from '../../../../../hooks';

const Logout = () => {
  const firebase = useFirebase();

  firebase.logout();

  return <Redirect to="/" />;
};

export default Logout;
