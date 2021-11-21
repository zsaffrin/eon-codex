import { useContext } from 'react';

import { FirebaseContext } from '../contexts';

const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  
  return firebase;
};

export default useFirebase;
