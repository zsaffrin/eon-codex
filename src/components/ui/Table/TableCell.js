import React from 'react';
import styled from 'styled-components';

import CollectionCell from './CollectionCell';
import MenuCell from './MenuCell';
import BooleanCell from './BooleanCell';
import DateCell from './DateCell';
import LongTextCell from './LongTextCell';
import MultiselectCell from './MultiselectCell';
import ActionsCell from './ActionsCell';
import NumberCell from './NumberCell';

const StyledCell = styled.td(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.thin} ${space.sm};
  `;
});

const TableCell = ({
  lookup, fieldValue, type, actions, entry, showAsBoolean,
}) => {
  let content = fieldValue;
  if (showAsBoolean || type === 'boolean') {
    content = <BooleanCell fieldValue={fieldValue} />;
  } else {
    if (type === 'lookup') {
      content = <CollectionCell lookup={lookup} fieldValue={fieldValue} />;
    }
    if (type === 'menu') {
      content = <MenuCell menu={lookup} fieldValue={fieldValue} />;
    }
    if (type === 'datetime') {
      content = <DateCell fieldValue={fieldValue} />;
    }
    if (type === 'multiselect') {
      content = <MultiselectCell fieldValue={fieldValue} />;
    }
    if (type === 'actions') {
      content = <ActionsCell actions={actions} entry={entry} />;
    }
    if (type === 'number') {
      content = <NumberCell fieldValue={fieldValue} />;
    }
    if (type === 'longtext') {
      content = <LongTextCell fieldValue={fieldValue} />;
    }
  }

  return <StyledCell>{content}</StyledCell>;
};

export default TableCell;
