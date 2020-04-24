import React, { useState } from 'react';
import { arrayOf, shape } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { sortBy } from '../../../../../../../utils';
import { Button, Modal } from '../../../../../../ui';
import { AddRecord } from '../../../../shared';
import RecordListItem from './RecordListItem';

const ActionsItem = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.md};
  `;
});

const CategoryRecordSelector = ({ records }) => {
  const { collectionId } = useParams();
  const [addRecord, setAddRecord] = useState(false);
  const history = useHistory();

  const toggleAddRecord = () => {
    setAddRecord(!addRecord);
  };

  const onDeleteSuccess = () => {
    history.push(`/info/${collectionId}`);
  };

  return (
    <div>
      {addRecord && (
      <Modal>
        <AddRecord
          schemaId={collectionId}
          onCancel={toggleAddRecord}
          onAddSuccess={toggleAddRecord}
          onDeleteSuccess={onDeleteSuccess}
          imperativeFields={[
            { key: 'schema', value: collectionId },
          ]}
        />
      </Modal>
      )}
      {sortBy(records, 'name').map(({ id, name }) => (
        <RecordListItem key={id} id={id} label={name} />
      ))}
      <ActionsItem>
        <Button tiny onClick={toggleAddRecord}>New</Button>
      </ActionsItem>
    </div>
  );
};
CategoryRecordSelector.propTypes = {
  records: arrayOf(shape({})),
};
CategoryRecordSelector.defaultProps = {
  records: [],
};

export default CategoryRecordSelector;
