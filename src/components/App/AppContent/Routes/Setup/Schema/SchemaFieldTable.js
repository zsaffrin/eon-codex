import { GoPencil } from 'react-icons/go';

import { useSchema } from '../../../../../../hooks';
import { Loading, Table } from '../../../../../ui';

const SchemaFieldTable = ({ fields }) => {
  const [schema, schemaLoading] = useSchema('schemaFields');
  
  if (schemaLoading) {
    return <Loading />;
  }

  const tableColumns = schema && schema.fields
    ? schema.fields.reduce((acc, { name, key, type, lookup }) => (
      key === 'displayOrder'
        ? acc
        : [ ...acc, {
            key, 
            title: name,
            type,
            lookup,
          }
        ]
    ), [])
    : [];

  const tableActions = [
    {
      label: <GoPencil />,
      action: () => {},
    }
  ];

  return (
    <div>
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
