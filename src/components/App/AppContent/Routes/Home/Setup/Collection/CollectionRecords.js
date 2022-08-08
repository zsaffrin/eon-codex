import { arrayOf, shape, string } from "prop-types";
import { GoPencil } from 'react-icons/go';

import { useCollection, useToggledModal } from '../../../../../../../hooks';
import { Button, ButtonRow, Loading, Table } from '../../../../../../ui';
import AddRecord from './AddRecord';
import EditRecord from './EditRecord';

const CollectionRecords = ({ schema }) => {
  const [collection, collectionLoading] = useCollection(schema.id);
  const [addModal, toggleAddModal] = useToggledModal(AddRecord, { schema });
  const [editModal, toggleEditModal] = useToggledModal(EditRecord, { schema });

  if (collectionLoading) {
    return <Loading />;
  }

  const tableColumns = schema && schema.fields
    ? schema.fields.reduce((acc, { name, key, type, lookup, lookupDisplayKey, showInTable }) => (
      showInTable
        ? [ ...acc, {
            key, 
            title: name,
            type,
            lookup,
            lookupDisplayKey,
          }
        ]
        : acc
    ), [])
    : [];
    const tableActions = [
      {
        icon: <GoPencil />,
        title: `Edit ${schema.recordName}`,
        action: toggleEditModal,
      }
    ];

  return (
    <>
      {addModal}
      {editModal}
      <ButtonRow justify="start">
        <Button
          primary
          label={`New ${schema.recordName}`}
          onClick={toggleAddModal}
        />
      </ButtonRow>
      <Table
        columns={tableColumns}
        entries={collection}
        actions={tableActions}
      />
    </>
  );
};
CollectionRecords.propTypes = {
  schema: shape({
    id: string,
    fields: arrayOf(shape({})),
  }),
};
CollectionRecords.defaultProps = {
  schema: {},
};

export default CollectionRecords;
