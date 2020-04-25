import React from 'react';
import { arrayOf, shape } from 'prop-types';

import { useCurrentUser } from '../../../hooks';
import { Button, ButtonRow } from '../Button';

const ActionsCell = ({ actions, entry }) => {
  const { user } = useCurrentUser();

  return (
    <ButtonRow align="start" compact>
      {actions.map(({ label, action, authLevelRequired }) => (
        user && (!authLevelRequired || (user.authLevelNum >= authLevelRequired))
        && <Button tiny onClick={() => action(entry)} key={label}>{label}</Button>
      ))}
    </ButtonRow>
  );
};
ActionsCell.propTypes = {
  actions: arrayOf(shape({})),
  entry: shape({}),
};
ActionsCell.defaultProps = {
  actions: [],
  entry: {},
};

export default ActionsCell;
