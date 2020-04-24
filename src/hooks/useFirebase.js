import { useContext } from 'react';

import { FirebaseContext } from '../contexts/firebaseContext';

const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  return firebase;
};

export default useFirebase;
