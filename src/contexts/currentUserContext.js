import React, { createContext } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import { useCurrentUser } from '../hooks';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user, userLoaded } = useCurrentUser();

  return (
    <UserContext.Provider value={{ user, userLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};
UserProvider.defaultProps = {
  children: [],
};

export { UserContext, UserProvider };
