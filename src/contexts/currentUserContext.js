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
      async function getAuthLevels() {
        const detail = await firebase.getCollection(
          'authLevels',
        );
        return detail;
      }

      const getPlayerData = () => (
        getDetail().then((detail) => getAuthLevels().then((authLevels) => ([detail, authLevels])))
      );

      if (userData) {
        getPlayerData().then((data) => {
          const authLevelNum = [...data[1]].find((l) => l.id === data[0].authLevel).level;
          setUser({
            uid: userData.uid,
            authLevelNum,
            ...data[0],
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
