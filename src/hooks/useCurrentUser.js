import { useContext } from 'react';

import { UserContext } from '../contexts/currentUserContext';

const useCurrentUser = () => {
  const { user, userLoaded } = useContext(UserContext);

  return {
    user,
    userLoaded,
  };
};

export default useCurrentUser;
