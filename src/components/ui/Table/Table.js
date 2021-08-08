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
  const firebase = useFirebase();

  const resetOrder = async () => {
    console.info('reset order');
    try {
      const results = entries.map(async (entry, idx) => {
        return firebase.updateDoc(`${schemaId}/${entry.id}`, {
          [orderKey]: idx + 1,
        });
      });

      return console.info(JSON.stringify(results));
    } catch (err) {
      setMessage('error', err, true);
    }
  };

  const handleReorder = async (oldOrder, newOrder) => {
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

    try {
      const resA = await firebase.updateDoc(`${schemaId}/${existingItem.id}`, {
        [orderKey]: oldOrder
      });
      const resB = await firebase.updateDoc(`${schemaId}/${movingItem.id}`, {
        [orderKey]: newOrder
      });
      if (resA.status === 'error' || resB.status === 'error') {
        setMessage('error', [resA, resB], true);
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };
  
  const headerCells = columns.map((col) => (
    <HeaderCell key={col.key} data={col} />
  ));
  if (orderKey) {
    headerCells.unshift(
      <HeaderCell key="reorder" data={{
        title: (
          <Button tiny onClick={resetOrder} title="Reset display order">
            <BiReset />
          </Button>
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
Table.defaultProps = {
  columns: [],
  entries: [],
};

export default Table;
