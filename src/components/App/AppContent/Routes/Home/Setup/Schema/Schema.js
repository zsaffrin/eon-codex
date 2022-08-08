import { useParams, useNavigate } from 'react-router-dom';

import { useSchema, useToggledModal } from '../../../../../../../hooks';
import { Box, Button, HeaderRow, Loading, Page, PageHeader } from "../../../../../../ui";
import SchemaDetails from './SchemaDetails';
import SchemaFields from './SchemaFields';
import AddSchemaField from './AddSchemaField';
import EditSchema from './EditSchema';

const Schema = () => {
  const { schemaId } = useParams();
  const [schema, schemaLoading] = useSchema(schemaId);
  const navigate = useNavigate();
  const [addModal, toggleAddModal] = useToggledModal(AddSchemaField, { schemaId });
  const [editModal, toggleEditModal] = useToggledModal(EditSchema, { data: schema });

  if (schemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <PageHeader
        title={schema.name}
        breadcrumbs={[{
          label: 'Setup',
          target: '/setup',
        },{
          label: 'Schemas',
          target: '/setup',
        }]}
        content={(
          <Button small label="Collection" onClick={() => navigate(`/setup/collection/${schemaId}`)} />
        )}
      />
      <Box>
        {editModal}
        <HeaderRow
          title="Schema Details"
          content={(
            <Button
              small
              label="Edit Schema"
              onClick={toggleEditModal}
            />
          )}
        />
        <SchemaDetails schema={schema} />
      </Box>
      <Box>
        {addModal}
        <HeaderRow
          title="Schema Fields"
          content={(
            <Button
              small
              label="New Schema Field"
              onClick={() => toggleAddModal(schema.fields.length + 1)}
            />
          )}
        />
        <SchemaFields schemaId={schemaId} fields={schema.fields} />
      </Box>
    </Page>
  );
};

export default Schema;
