import React from 'react';
import {
  arrayOf, node, number, oneOfType,
} from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useCollection, useCurrentUser } from '../../../../../hooks';
import { Loading } from '../../../../ui';

const PrivateRoute = ({ authLevel, children, ...rest }) => {
  const { user } = useCurrentUser();
  const [authLevels, authLevelsLoading] = useCollection('authLevels');

  const userAuthLevel = authLevels && user
    ? authLevels.find((l) => l.id === user.authLevel)
    : null;

  if (authLevelsLoading) {
    return <Loading />;
  }

  return userAuthLevel && userAuthLevel.level >= authLevel
    ? <Route {...rest}>{children}</Route>
    : <Redirect to="/" />;
};
PrivateRoute.propTypes = {
  authLevel: number,
  children: oneOfType([arrayOf(node), node]),
};
PrivateRoute.defaultProps = {
  authLevel: 0,
  children: [],
};

export default PrivateRoute;
