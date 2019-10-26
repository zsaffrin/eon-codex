import { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../contexts/firebaseContext";

export function useCurrentUser() {
  const firebase = useContext(FirebaseContext);
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
  }, []);

  return [user, loaded];
}
