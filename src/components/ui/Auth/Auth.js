import React from 'react';
import {
  arrayOf, node, number, oneOfType,
} from 'prop-types';

import { useCurrentUser, useCollection } from '../../../hooks';

const Auth = ({ children, level }) => {
  const { user } = useCurrentUser();
  const [authLevels] = useCollection('authLevels');

  const userAuthLevel = authLevels && user ? authLevels.find((l) => l.id === user.authLevel) : null;

  return userAuthLevel && userAuthLevel.level >= level ? (
    <>{children}</>
  ) : null;
};

Auth.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  level: number,
};
Auth.defaultProps = {
  children: [],
  level: 0,
};

export default Auth;
