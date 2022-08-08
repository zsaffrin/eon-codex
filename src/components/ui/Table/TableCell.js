import styled from 'styled-components';

import ActionsCell from './ActionsCell';
import BooleanCell from './BooleanCell';
import DateCell from './DateCell';
import LookupCell from './LookupCell';
import ReorderCell from './ReorderCell';

const StyledCell = styled.td(({ theme, collapsed }) => {
  const { tables, space } = theme;

  return `
    border: ${tables.border};
    padding: ${space.thin} ${space.sm};
    vertical-align: top;
    width: ${collapsed ? '0%' : 'auto'};
  `;
});

const TableCell = (props) => {
  const { fieldValue, type } = props;
  let collapsed = false;

  let content = fieldValue;
  if (type === 'reorder') {
    content = <ReorderCell {...props} />;
    collapsed = true;
  }
  if (type === 'actions') {
    content = <ActionsCell {...props} />;
    collapsed = true;
  }
  if (type === 'boolean') {
    content = <BooleanCell {...props} />;
    collapsed = true;
  }
  if (type === 'date') {
    content = <DateCell {...props} />;
  }
  if (type === 'lookup') {
    content = <LookupCell {...props} />;
  }
  
  return (
    <StyledCell collapsed={collapsed ? 1 : 0}>
      {content}
    </StyledCell>
  );
};

export default TableCell;
