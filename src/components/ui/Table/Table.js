import { useState } from 'react';
import styled from 'styled-components';

import { useFirebase } from '../../../hooks';
import { Message } from '../../ui';
import { maxFieldValue } from '../../../utilities';
import HeaderCell from './HeaderCell';
import TableCell from './TableCell';

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 0.8rem;
  width: 100%;
`;

const Table = ({ columns, entries, actions, orderKey, schemaId }) => {
  const [message, setMessage] = useState(null);
  const firebase = useFirebase();

  const handleReorder = async (oldOrder, newOrder) => {
    const movingItem = entries.find(e => e[orderKey] === oldOrder);
    const existingItem = entries.find(e => e[orderKey] === newOrder);

    try {
      const resA = await firebase.updateDoc(`${schemaId}/${existingItem.id}`, {
        [orderKey]: oldOrder
      });
      const resB = await firebase.updateDoc(`${schemaId}/${movingItem.id}`, {
        [orderKey]: newOrder
      });
      if (resA.status === 'error' || resB.status === 'error') {
        setMessage({ type: 'error', content: [
          resA,
          resB,
        ] });
      }
    } catch (err) {
      setMessage({ type: 'error', content: err });
    }
  };
  
  const headerCells = columns.map((col) => (
    <HeaderCell key={col.key} data={col} />
  ));
  if (orderKey) {
    headerCells.unshift(
      <th key="reorder" />
    );
  }
  if (actions) {
    headerCells.push(
      <th key="actions" />
    );
  }

  const minOrderValue = maxFieldValue(entries, orderKey, true);
  const maxOrderValue = maxFieldValue(entries, orderKey);
  const entryRows = entries.reduce((acc, entry, idx) => (
    [
      ...acc,
      (
        <tr key={`entry-${idx}`}>
          {orderKey && (
            <TableCell 
              type="reorder"
              minOrderValue={minOrderValue}
              maxOrderValue={maxOrderValue}
              entryOrderKey={entry[orderKey]}
              handleReorder={handleReorder}
            />
          )}
          {columns.map(({ key, type, lookup }) => (
            <TableCell 
              key={`cell-${key}`}
              fieldValue={entry[key]}
              type={type}
              lookup={lookup}
            />
          ))}
          {actions && (
            <TableCell
              type="actions"
              entry={entry}
              actions={actions}
            />
          )}
        </tr>
      )
    ]
  ), []);
  
  return (
    <>
      {message && (
        <Message type={message.type} raw>{message.content}</Message>
      )}
      <StyledTable>
        <thead>
          <tr>
            {headerCells}
          </tr>
        </thead>
        <tbody>
            {entryRows}
        </tbody>
      </StyledTable>
    </>
  );
};
Table.defaultProps = {
  columns: [],
  entries: [],
};

export default Table;
