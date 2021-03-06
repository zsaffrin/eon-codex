import React, { useState } from 'react';
import { string } from 'prop-types';

import { sortBy } from '../../../../../utils';
import { useCollection, useSchemaFields } from '../../../../../hooks';
import { Loading, Modal, Table } from '../../../../ui';
import { EditRecord } from '../record';

const ViewCollection = ({ collectionId, orderKey }) => {
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(collectionId);
  const [records, recordsLoading] = useCollection(collectionId);
  const [editItem, setEditItem] = useState(null);

  const toggleEditItem = (itemToEdit) => {
    setEditItem(editItem ? null : itemToEdit);
  };

  const columns = schemaFields ? sortBy(schemaFields, 'displayOrder') : [];
  const actions = [
    { label: 'Edit', action: toggleEditItem },
  ];

  return schemaFieldsLoading || recordsLoading ? <Loading /> : (
    <>
      {editItem && (
        <Modal>
          <EditRecord
            schemaId={collectionId}
            onCancel={toggleEditItem}
            onSaveSuccess={toggleEditItem}
            recordData={editItem}
          />
        </Modal>
      )}
      <Table
        columns={columns}
        entries={records}
        actions={actions}
        orderKey={orderKey}
      />
    </>
  );
};
ViewCollection.propTypes = {
  collectionId: string,
  orderKey: string,
};
ViewCollection.defaultProps = {
  collectionId: ' ',
  orderKey: null,
};

export default ViewCollection;
