import React, { useState } from 'react';
import {
  arrayOf, shape, string,
} from 'prop-types';
import styled from 'styled-components';

import { sortBy } from '../../../utils/dataUtils';
import TableCell from './TableCell';

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 0.8rem;
  width: 100%;
`;
const TableRow = styled.tr(({ theme }) => {
  const { tables } = theme;
  return `
    border-bottom: 1px solid ${tables.rowBorderColor};
  `;
});
const HeaderCell = styled.th(({ align, theme }) => {
  const { space } = theme;
  return `
    padding: ${space.md} ${space.sm};
    text-align: ${align || 'left'};
  `;
});

const Table = ({
  columns, entries, actions, orderKey,
}) => {
  const [sortKey, setSortKey] = useState(orderKey || 'name');
  const [sortOrder, setSortOrder] = useState('asc');

  const updateSort = (key) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
    }
  };

  return (
    <StyledTable>
      {/* Header cells */}
      <thead>
        <TableRow>
          {columns.map(({ key, name, align }) => (
            <HeaderCell key={`${key}Header`} align={align} onClick={() => updateSort(key)}>
              {name}
            </HeaderCell>
          ))}
          {actions && <HeaderCell />}
        </TableRow>
      </thead>

      {/* Content cells */}
      <tbody>
        {sortBy(entries, sortKey, sortOrder).map((entry) => (
          <TableRow key={entry.id}>
            {/* Data columns */}
            {columns.map(({
              key, lookup, type,
            }) => (
              <TableCell
                key={key}
                lookup={lookup}
                type={type}
                fieldValue={entry[key]}
              />
            ))}

            {/* Action buttons */}
            <TableCell type="actions" actions={actions} entry={entry} />
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
Table.propTypes = {
  columns: arrayOf(shape({ key: string, name: string })),
  entries: arrayOf(shape({})),
  actions: arrayOf(shape({})),
  orderKey: string,
};
Table.defaultProps = {
  columns: [],
  entries: [],
  actions: null,
  orderKey: null,
};

export default Table;
