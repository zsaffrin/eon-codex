import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSchema, useSchemaFields } from '../../../../../../hooks';
import {
  ButtonRow, Button, Loading, Modal, Table,
} from '../../../../../ui';
import { AddRecord, EditRecord } from '../../../shared';
import { sortBy } from '../../../../../../utils';

const ManageSchemaFields = () => {
  const { schemaId } = useParams();
  const [fields, fieldsLoading] = useSchemaFields('75luZmtngldtl8lGN92m');
  const [schema, schemaLoading] = useSchema(schemaId);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(schemaId);
  const [addNew, setAddNew] = useState(false);
  const [editField, setEditField] = useState(null);

  const toggleAddNew = () => (
    setAddNew(!addNew)
  );
  const toggleEditField = (fieldData) => (
    editField ? setEditField(null) : setEditField(fieldData)
  );

  const columns = fields ? sortBy(fields, 'displayOrder') : [];
  const actions = [
    { label: 'Edit', action: toggleEditField },
  ];

  return schemaLoading || schemaFieldsLoading || fieldsLoading ? <Loading /> : (
    <div>
      {addNew && (
        <Modal>
          <AddRecord
            schemaId="75luZmtngldtl8lGN92m"
            onCancel={toggleAddNew}
            onAddSuccess={toggleAddNew}
            imperativeFields={[
              { key: 'schema', value: schemaId },
            ]}
          />
        </Modal>
      )}
      {editField && (
        <Modal>
          <EditRecord
            schemaId="75luZmtngldtl8lGN92m"
            onCancel={toggleEditField}
            onSaveSuccess={toggleEditField}
            recordData={editField}
            imperativeFields={[
              { key: 'schema', value: schemaId },
            ]}
          />
        </Modal>
      )}
      <ButtonRow align="start">
        <Button tiny onClick={toggleAddNew}>New</Button>
      </ButtonRow>
      <Table
        columns={columns}
        entries={schemaFields}
        actions={actions}
        orderKey="displayOrder"
        reorderable
        collectionId={schema.collection}
      />
    </div>
  );
};

export default ManageSchemaFields;
