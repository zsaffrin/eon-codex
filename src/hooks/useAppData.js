import { useContext } from 'react';

import { AppDataContext } from '../contexts';

const useAppData = () => {
  const appData = useContext(AppDataContext);
  
  return appData;
};

export default useAppData;
