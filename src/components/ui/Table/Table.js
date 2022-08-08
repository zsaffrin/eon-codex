import { arrayOf, shape, string } from 'prop-types';
import { BiReset } from 'react-icons/bi';
import styled from 'styled-components';

import { useFirebase, useMessage } from '../../../hooks';
import { Button } from '../../ui';
import { maxFieldValue } from '../../../utilities';
import HeaderCell from './HeaderCell';
import TableCell from './TableCell';

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 0.8rem;
  width: 100%;
`;

const Table = ({ columns, entries, actions, orderKey, schemaId }) => {
  const [message, setMessage] = useMessage();
  const { updateDocument } = useFirebase();

  const setNewOrder = async (recordId, orderToSet) => {
    try {
      await updateDocument(schemaId, recordId, {
        [orderKey]: orderToSet
      });
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };

  const resetOrder = () => {
    setMessage();
    return entries.map((entry, idx) => {
      return setNewOrder(entry.id, (idx + 1));
    });
  };

  const handleReorder = (oldOrder, newOrder) => {
    setMessage();
    const movingItem = entries.find(e => e[orderKey] === oldOrder);
    const existingItem = entries.find(e => e[orderKey] === newOrder);

    if (!movingItem || !existingItem) {
      return setMessage('error', (
        <div>
          Problem moving item
          <br />
          {`Position ${oldOrder} [${movingItem ? movingItem.name : 'null'}] to position ${newOrder} [${existingItem ? existingItem.name : 'null'}]`}
          <br />
          Reset the display order then try again
        </div>
      ));
    }

    setNewOrder(existingItem.id, oldOrder);
    setNewOrder(movingItem.id, newOrder);
  };
  
  const headerCells = columns.map((col) => (
    <HeaderCell key={col.key} data={col} />
  ));
  if (orderKey) {
    headerCells.unshift(
      <HeaderCell key="reorder" data={{
        title: (
          <Button
            tiny
            onClick={resetOrder}
            title="Reset display order"
            icon={<BiReset />}
          />
        ),
      }} />
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
          {orderKey && schemaId && (
            <TableCell 
              type="reorder"
              minOrderValue={minOrderValue}
              maxOrderValue={maxOrderValue}
              entryOrderKey={entry[orderKey]}
              handleReorder={handleReorder}
            />
          )}
          {columns.map(({ key, type, lookup, lookupDisplayKey }) => (
            <TableCell 
              key={`cell-${key}`}
              fieldValue={entry[key]}
              type={type}
              lookup={lookup}
              lookupDisplayKey={lookupDisplayKey}
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
      {message}
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
Table.propTypes = {
  columns: arrayOf(shape({})),
  entries: arrayOf(shape({})),
  actions: arrayOf(shape({})),
  orderKey: string,
  schemaId: string,
};
Table.defaultProps = {
  columns: [],
  entries: [],
};

export default Table;
