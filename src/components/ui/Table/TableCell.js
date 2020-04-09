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

const StyledCell = styled.td(({ theme, nowrap }) => {
  const { space } = theme;
  return `
    padding: ${space.thin} ${space.sm};
    white-space: ${nowrap ? 'nowrap' : 'normal'};
  `;
});

const TableCell = ({
  lookup, lookupArg, fieldValue, type, actions, entry, showAsBoolean, nowrap,
}) => {
  let content = fieldValue;
  if (showAsBoolean || type === 'boolean') {
    content = <BooleanCell fieldValue={fieldValue} />;
  } else {
    if (type === 'lookup') {
      content = <CollectionCell lookup={lookup} lookupArg={lookupArg} fieldValue={fieldValue} />;
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

  return <StyledCell nowrap={nowrap ? 1 : 0}>{content}</StyledCell>;
};

export default TableCell;
