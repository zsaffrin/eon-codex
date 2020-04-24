import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import { FirebaseContext } from './firebaseContext';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((userData) => {
      async function getDetail() {
        const detail = await firebase.getDoc(
          'players',
          userData ? userData.uid : ' ',
        );
        return detail;
      }

      if (userData) {
        getDetail().then((detail) => {
          setUser({
            uid: userData.uid,
            ...detail,
          });
          setUserLoaded(true);
        });
      } else {
        setUser(userData);
        setUserLoaded(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return (
    <UserContext.Provider value={{ user, userLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};
UserProvider.defaultProps = {
  children: [],
};

export { UserContext, UserProvider };
