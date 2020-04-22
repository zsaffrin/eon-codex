import React, { createContext } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import firebase from '../firebase';

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={firebase}>
    {children}
  </FirebaseContext.Provider>
);
FirebaseProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};
FirebaseProvider.defaultProps = {
  children: [],
};

export { FirebaseContext, FirebaseProvider };
