import { arrayOf, shape, string } from "prop-types";
import { GoPencil } from 'react-icons/go';

import { useSchema, useToggledModal } from '../../../../../../../hooks';
import { Loading, Table } from '../../../../../../ui';
import EditSchemaField from './EditSchemaField';

const SchemaFields = ({ schemaId, fields }) => {
  const [schema, schemaLoading] = useSchema('schemaFields');
  const [editModal, toggleEditModal] = useToggledModal(EditSchemaField, {
    schemaId,
    schema,
  });

  if (schemaLoading) {
    return <Loading />;
  }

  const tableColumns = schema && schema.fields
    ? schema.fields.reduce((acc, { key, lookup, name, showInTable, type }) => (
      showInTable
        ? [...acc, {
            key,
            lookup,
            title: name,
            type,
          }]
        : acc
    ), [])
    : [];

  const tableActions = [
    {
      icon: <GoPencil />,
      title: 'Edit schema field',
      action: toggleEditModal,
    }
  ];
  
  return (
    <>
      {editModal}
      <Table
        columns={tableColumns}
        entries={fields}
        actions={tableActions}
        orderKey="displayOrder"
        schemaId={schema.id}
      />
    </>
  );
};
SchemaFields.propTypes = {
  schemaId: string.isRequired,
  fields: arrayOf(shape({})),
};
SchemaFields.defaultProps = {
  fields: [],
};

export default SchemaFields;
