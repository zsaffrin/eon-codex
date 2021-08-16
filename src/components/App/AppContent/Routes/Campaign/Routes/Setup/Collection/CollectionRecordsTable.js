import { useState } from 'react';
import { GoPencil } from 'react-icons/go';

import { useCampaign } from '../../../../../../../../hooks';
import { Modal, Table } from '../../../../../../../ui';
import EditCollectionRecord from './EditCollectionRecord';

const CollectionRecordsTable = ({ schema }) => {  
  const [editing, setEditing] = useState(null);
  const campaign = useCampaign();
  const collection = campaign[schema.id];
  
  const tableColumns = schema && schema.fields
    ? schema.fields.reduce((acc, { name, key, type, lookup, showInTable }) => {
      if (!showInTable
        || key === 'campaign') {
        return acc;
      }

      return [ ...acc, {
        key, 
        title: name,
        type,
        lookup,
      }];
    }, [])
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
