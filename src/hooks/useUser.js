import { useContext } from 'react';

import { UserContext } from '../contexts';

const useUser = () => {
  const [user, isUserLoaded] = useContext(UserContext);

  return [
    user,
    isUserLoaded,
  ];
};

export default useUser;
