import { useContext } from 'react';

import { UserContext } from '../contexts';

const useUser = () => {
  const [user, loading, error] = useContext(UserContext);
  
  return [user, loading, error];
};

export default useUser;
