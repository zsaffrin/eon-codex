import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSchemaFields } from '../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, Loading, Table,
} from '../../ui';

const FieldsManager = () => {
  const { schemaName } = useParams();
  const [columns] = useState([
    { key: 'key', name: 'Key' },
    { key: 'name', name: 'Name' },
    {
      key: 'order', name: 'Order', type: 'number', align: 'center',
    },
    { key: 'type', name: 'Type' },
    {
      key: 'showAsBoolean', name: 'Compact', type: 'boolean', align: 'center',
    },
    {
      key: 'showOnTables', name: 'Display', type: 'boolean', align: 'center',
    },
  ]);
  const [entries, setEntries] = useState(null);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(schemaName);

  const history = useHistory();

  // Set up entries
  useEffect(() => {
    if (!schemaFieldsLoading && schemaFields && !entries) {
      setEntries(schemaFields);
    }
  }, [schemaFieldsLoading, schemaFields, entries]);

  const actions = [
    {
      label: 'Edit',
      action: (e) => history.push(`/settings/schemaField/${e.schema}/${e.id}`),
    },
  ];

  return schemaFieldsLoading || !entries ? <Loading /> : (
    <div>
      <Table
        columns={columns}
        entries={entries}
        actions={actions}
        orderKey="order"
      />
      <ButtonRow align="start">
        <Button tiny onClick={() => history.push(`/settings/schemaField/${schemaName}/add`)}>Add Field</Button>
      </ButtonRow>
    </div>
  );
};

export default FieldsManager;
