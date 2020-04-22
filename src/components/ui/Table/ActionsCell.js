import React from 'react';
import { arrayOf, shape } from 'prop-types';

import { Button, ButtonRow } from '../Button';

const ActionsCell = ({ actions, entry }) => (
  <ButtonRow align="start" compact>
    {actions.map(({ label, action }) => (
      <Button tiny onClick={() => action(entry)} key={label}>{label}</Button>
    ))}
  </ButtonRow>
);
ActionsCell.propTypes = {
  actions: arrayOf(shape({})),
  entry: shape({}),
};
ActionsCell.defaultProps = {
  actions: [],
  entry: {},
};

export default ActionsCell;
