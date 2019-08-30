import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../contexts/firebaseContext";

export function useCurrentUser() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user && user.uid) {
        firebase.db
          .collection("players")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.error(`player detail for uid ${user.uid} not loaded`);
            } else {
              const playerData = doc.data();
              const playerDetail = {
                uid: user.uid,
                email: user.email,
                ...playerData
              };
              setUser(playerDetail);
              setLoaded(true);
            }
          })
          .catch(err => console.error(err.message));
      } else {
        setUser(user);
        setLoaded(true);
      }
    });

    return () => unsubscribe();
  });

  return [user, loaded];
}
