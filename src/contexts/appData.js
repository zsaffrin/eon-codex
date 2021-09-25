import { createContext } from 'react';

const AppDataContext = createContext();

const AppDataProvider = ({ appData, children }) => {
  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContext, AppDataProvider };
