import { useState, useEffect } from "react";

export function useCurrentUser(firebase) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(userData => {
      if (userData) {
        async function getDetail() {
          const detail = await firebase.getDoc(
            "players",
            userData ? userData.uid : " "
          );
          return detail;
        }
        getDetail().then(detail => {
          setUser({
            uid: userData.uid,
            ...detail
          });
          !loaded && setLoaded(true);
        });
      } else {
        setUser(userData);
        !loaded && setLoaded(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [user, loaded];
}
