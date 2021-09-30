import { useState } from 'react';
import { GoPencil } from 'react-icons/go';

import { useSchema } from '../../../../../../hooks';
import { Loading, Modal, Table } from '../../../../../ui';
import EditSchemaField from './EditSchemaField';

const SchemaFieldTable = ({ fields }) => {
  const [editing, setEditing] = useState(null);
  const [schema, schemaLoading] = useSchema('schemaFields');
  
  if (schemaLoading) {
    return <Loading />;
  }

  const tableColumns = schema && schema.fields
    ? schema.fields.reduce((acc, { name, key, type, lookup, showInTable }) => (
      showInTable
        ? [ ...acc, {
            key, 
            title: name,
            type,
            lookup,
          }
        ]
        : acc
    ), [])
    : [];

  const tableActions = [
    {
      label: <GoPencil />,
      title: `Edit ${schema.recordName}`,
      action: setEditing,
    }
  ];

  return (
    <div>
      {editing && (
        <Modal>
          <EditSchemaField 
            close={() => setEditing(null)}
            item={editing}
            schema={schema}
          />
        </Modal>
      )}
      <Table 
        columns={tableColumns} 
        entries={fields}
        actions={tableActions}
        orderKey="displayOrder"
        schemaId={schema.id}
      />
    </div>
  );
};

export default SchemaFieldTable;
