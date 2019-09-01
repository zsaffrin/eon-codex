import { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../contexts/firebaseContext";

export function useCurrentUser() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const unsubscribe = firebase.auth.onAuthStateChanged(user => {
        if (user && user.uid) {
          firebase.db
            .collection("players")
            .doc(user.uid)
            .get()
            .then(doc => {
              let playerDetail = {
                uid: user.uid,
                email: user.email,
                displayName: ""
              };
              if (!doc.exists) {
                console.warn(
                  `player detail for uid ${user.uid} not found. Loading default data`
                );
              } else {
                playerDetail = {
                  ...playerDetail,
                  ...doc.data()
                };
              }
              setUser(playerDetail);
              setLoaded(true);
            })
            .catch(err => console.error(err.message));
        } else {
          setUser(user);
          setLoaded(true);
        }
      });

      return () => unsubscribe();
    }
  });

  return [user, loaded];
}
