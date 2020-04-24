import React from 'react';
import {
  bool, number, oneOfType, shape, string,
} from 'prop-types';
import styled from 'styled-components';

import ActionsCell from './ActionsCell';
import BooleanCell from './BooleanCell';
import DateCell from './DateCell';
import LookupCell from './LookupCell';
import MultiselectCell from './MultiselectCell';

const StyledCell = styled.td(({ nowrap, theme }) => {
  const { space } = theme;
  return `
    padding: ${space.thin} ${space.sm};
    white-space: ${nowrap ? 'nowrap' : 'inherit'};
  `;
});

const TableCell = (props) => {
  const { fieldValue, nowrap, type } = props;

  let content = fieldValue;

  // Actions
  if (type === 'actions') {
    content = <ActionsCell {...props} />;
  }

  // Boolean or Longtext
  if (type === 'kS0IrlGzDlKE9MKTHUYA' || type === 'EpX4vmYkb5yrNBCvrw4H') {
    content = <BooleanCell {...props} />;
  }

  // Date
  if (type === 'o6dGESH0GHoa0ypYPrcg') {
    content = <DateCell {...props} />;
  }

  // Lookup
  if (type === 'ChOfADmf2wqLZEA5eDo7') {
    content = <LookupCell {...props} />;
  }

  // Multiselect
  if (type === 'zc4uYOZDSTNrt0Se9jKC') {
    content = <MultiselectCell {...props} />;
  }

  return <StyledCell nowrap={nowrap ? 1 : 0}>{content}</StyledCell>;
};
TableCell.propTypes = {
  fieldValue: oneOfType([bool, number, shape({}), string]),
  nowrap: bool,
  type: string,
};
TableCell.defaultProps = {
  fieldValue: null,
  nowrap: false,
  type: 'text',
};

export default TableCell;
