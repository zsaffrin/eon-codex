import { useContext } from 'react';

import { UserContext } from '../contexts/userContext';

const useCurrentUser = () => {
  const [user, isUserLoaded] = useContext(UserContext);

  return [
    user,
    isUserLoaded,
  ];
};

export default useCurrentUser;
