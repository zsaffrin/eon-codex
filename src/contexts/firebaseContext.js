import React, { createContext } from "react";

import firebase from "../firebase";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={firebase}>
    {children}
  </FirebaseContext.Provider>
);

export { FirebaseContext, FirebaseProvider };
