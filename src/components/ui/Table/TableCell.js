import styled from 'styled-components';

import ActionsCell from './ActionsCell';
import BooleanCell from './BooleanCell';
import DateCell from './DateCell';
import LookupCell from './LookupCell';

const StyledCell = styled.td(({ theme, collapsed }) => {
  const { table, space } = theme;

  return `
    border: 1px solid ${table.borderColor};
    padding: ${space.sm} ${space.md};
    vertical-align: top;
    width: ${collapsed ? '0%' : 'auto'};
  `;
});

const TableCell = ({ actions, fieldValue, entry, lookup, type }) => {
  let content = fieldValue;
  if (type === 'actions') {
    content = <ActionsCell actions={actions} entry={entry} />;
  }
  if (type === 'boolean') {
    content = <BooleanCell fieldValue={fieldValue} />;
  }
  if (type === 'date') {
    content = <DateCell fieldValue={fieldValue} />;
  }
  if (type === 'lookup') {
    content = <LookupCell fieldValue={fieldValue} lookup={lookup} />;
  }
  
  return (
    <StyledCell collapsed={type === 'actions' ? 1 : 0}>
      {content}
    </StyledCell>
  );
};

export default TableCell;
