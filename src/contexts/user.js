import { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContext } from './firebase';
import { useDocument } from '../hooks';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { auth } = useContext(FirebaseContext);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [userDetail, userDetailLoading, userDetailError] = useDocument(`users/${authUser ? authUser.uid : ' '}`);

  const isLoading = authLoading || userDetailLoading;
  
  let error;
  if (!authLoading && authError) { 
    error = (
      <div>
        <strong>Auth Error</strong>
        <pre>{JSON.stringify(authError, ' ', 2)}</pre>
      </div>
    );
  }
  if (!userDetailLoading && userDetailError) {
    error = (
      <div>
        <strong>UserDetail Error</strong>
        <pre>{JSON.stringify(userDetailError, ' ', 2)}</pre>
      </div>
    );
  }

  const user = authUser 
    && ({
      id: authUser.uid,
      ...userDetail,
      rawData: authUser
    });

  return (
    <UserContext.Provider value={[user, isLoading, error]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
