import { createContext, useContext, useEffect, useState } from 'react';

import { FirebaseContext } from './firebase';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((authStateUser) => {
      async function fetchUserDetail() {
        const detail = await firebase.getDoc(
          'users',
          authStateUser ? authStateUser.uid : null,
        );
        return detail;
      }

      const populateUserDetail = (userData) => {
        console.info(`Populate user ${userData.email}`);
        const { email, emailVerified, displayName, phoneNumber } = userData;
        const userDetails = {
          email,
          emailVerified,
          phoneNumber,
          name: displayName,
        };

        firebase.setDoc('users', authStateUser.uid, userDetails).then((res) => {
          if (res.status === 'success') {
            return setUser({ uid: userData.uid, ...userDetails, rawData: userData });
          }
          return setUser({ uid: userData.uid, rawData: userData });
        });
      };

      if (authStateUser) {
        fetchUserDetail().then((userDetail) => {
          userDetail
            ? setUser({
              uid: authStateUser.uid,
              ...userDetail,
              rawData: authStateUser
            })
            : populateUserDetail(authStateUser);
          setIsUserLoaded(true);
        });
      } else {
        setUser(authStateUser);
        setIsUserLoaded(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return (
    <UserContext.Provider value={{ user, isUserLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
