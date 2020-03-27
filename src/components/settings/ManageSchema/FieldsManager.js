import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useFirebase, useSchemaFields } from '../../../hooks/firestoreHooks';
import { moveArrayItem } from '../../../utils/dataUtils';
import {
  ButtonRow, Button, Loading, Table,
} from '../../ui';

const FieldsManager = () => {
  const { schemaName } = useParams();
  const [columns] = useState([
    { key: 'key', name: 'Key' },
    { key: 'name', name: 'Name' },
    { key: 'type', name: 'Type' },
    {
      key: 'showAsBoolean', name: 'Compact', type: 'boolean', align: 'center',
    },
    {
      key: 'showOnTables', name: 'Display', type: 'boolean', align: 'center',
    },
  ]);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(schemaName);
  const firebase = useFirebase();
  const history = useHistory();

  const actions = [
    {
      label: 'Edit',
      action: (e) => history.push(`/settings/schemaField/${e.schema}/${e.id}`),
    },
  ];

  const reorder = (currentIndex, newIndex) => {
    const updatedItems = moveArrayItem([...schemaFields], currentIndex, newIndex);
    return updatedItems.map((item, idx) => firebase.updateDoc(`schemaFields/${item.id}`, {
      displayOrder: idx + 1,
      modified: new Date(),
    }));
  };

  return schemaFieldsLoading || !schemaFields ? <Loading /> : (
    <div>
      <Table
        columns={columns}
        entries={schemaFields}
        actions={actions}
        reorderable
        orderKey="displayOrder"
        handleOrderChange={reorder}
      />
      <ButtonRow align="start">
        <Button tiny onClick={() => history.push(`/settings/schemaField/${schemaName}/add`)}>Add Field</Button>
      </ButtonRow>
    </div>
  );
};

export default FieldsManager;
