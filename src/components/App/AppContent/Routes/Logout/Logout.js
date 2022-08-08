import { Navigate } from 'react-router-dom';

import { useFirebase } from '../../../../../hooks';

const Logout = () => {
  const { logout } = useFirebase();

  logout();

  return <Navigate to="/" />;
};

export default Logout;
