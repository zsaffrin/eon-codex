import React, { useEffect, useState } from 'react';
import {
  arrayOf, shape, string, bool, func,
} from 'prop-types';
import styled from 'styled-components';

import { findMinMaxOfKey, sortBy } from '../../../utils/dataUtils';
import Button from '../Button';
import Icon from '../Icon';
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
  columns, entries, actions, reorderable, orderKey, handleOrderChange,
}) => {
  const [sortKey, setSortKey] = useState(orderKey || 'name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [orderMin, setOrderMin] = useState(0);
  const [orderMax, setOrderMax] = useState(0);

  useEffect(() => {
    const order = findMinMaxOfKey(entries, orderKey);
    setOrderMin(order.min);
    setOrderMax(order.max);
  }, [entries, orderKey]);

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
          {reorderable && <HeaderCell />}
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
        {sortBy(entries, sortKey, sortOrder).map((entry, idx) => (
          <TableRow key={entry.id}>
            {/* Ordering controls */}
            {reorderable && (
              entry[orderKey] ? (
                <td>
                  {entry[orderKey] > orderMin && (
                    <Button tiny onClick={() => handleOrderChange(entry[orderKey] - 1, entry[orderKey] - 2)}>
                      <Icon name="arrow-up" />
                    </Button>
                  )}
                  {entry[orderKey] < orderMax && (
                    <Button tiny onClick={() => handleOrderChange(entry[orderKey] - 1, entry[orderKey])}>
                      <Icon name="arrow-down" />
                    </Button>
                  )}
                </td>
              ) : (
                <td>
                  {idx === 0 && (
                    <Button
                      tiny
                      onClick={() => handleOrderChange(0, 0)}
                      title={`Fields are not initiated with the designated orderKey ("${orderKey}"). Click here to populate.`}
                    >
                      <Icon name="plus" />
                    </Button>
                  )}
                </td>
              )
            )}

            {/* Data columns */}
            {columns.map(({
              key, lookup, lookupArg, type, showAsBoolean, nowrap,
            }) => (
              <TableCell
                key={key}
                lookup={lookup}
                lookupArg={lookupArg}
                type={type}
                fieldValue={entry[key]}
                showAsBoolean={showAsBoolean}
                nowrap={nowrap}
              />
            ))}

            {/* Action buttons */}
            {actions && <TableCell type="actions" actions={actions} entry={entry} />}
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
  reorderable: bool,
  handleOrderChange: func,
};
Table.defaultProps = {
  columns: [],
  entries: [],
  actions: null,
  orderKey: null,
  reorderable: false,
  handleOrderChange: () => {},
};

export default Table;
