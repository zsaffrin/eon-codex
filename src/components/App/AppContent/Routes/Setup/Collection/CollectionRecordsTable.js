import { useState } from 'react';
import { GoPencil } from 'react-icons/go';

import { useCollection } from '../../../../../../hooks';
import { Loading, Modal, Table } from '../../../../../ui';
import EditCollectionRecord from './EditCollectionRecord';

const CollectionRecordsTable = ({ collectionId, schema }) => {
  const [editing, setEditing] = useState(null);
  const [collection, isCollectionLoading] = useCollection(collectionId);

  if (isCollectionLoading) {
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
      action: setEditing,
    }
  ];

  return (
    <div>
      {editing && (
        <Modal>
          <EditCollectionRecord 
            close={() => setEditing(null)}
            item={editing}
            schema={schema}
          />
        </Modal>
      )}
      <Table 
        columns={tableColumns} 
        entries={collection}
        actions={tableActions}
        schemaId={schema.id}
      />
    </div>
  );
};

export default CollectionRecordsTable;
