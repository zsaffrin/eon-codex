import React, { createContext } from "react";

import { useCurrentUser } from "../hooks/authHooks";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, userLoaded] = useCurrentUser();

  return (
    <UserContext.Provider value={userLoaded && user}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
