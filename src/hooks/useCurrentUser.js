import { useState, useEffect } from 'react';

import useFirebase from './useFirebase';

const useCurrentUser = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
          setLoaded(true);
        });
      } else {
        setUser(userData);
        setLoaded(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return {
    user,
    userLoaded: loaded,
  };
};

export default useCurrentUser;
