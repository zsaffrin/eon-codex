import { useFirebase, useSchema } from '../../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../../ui';

const AddSchemaField = ({ close, schemaId, valueState }) => {
  const [schema, schemaLoading] = useSchema('schemaFields');
  const { addDocument } = useFirebase();
  
  const handleFormSubmit = (formData) => {
    addDocument('schemaFields', {
      ...formData,
      schema: schemaId,
      displayOrder: valueState,
    })
      .then(() => close());
  };

  const handleCancel = () => {
    close();
  };

  if (schemaLoading) {
    return <Loading />;
  }

  const formFields = schema.fields.reduce((acc, field) => {
    return field.showInEditor
      ? [ ...acc, field ]
      : acc;
  }, []);

  const buttonRow = (
    <ButtonRow>
      <Button primary label="Add Field" type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
    </ButtonRow>
  );

  return (
    <Page>
      <PageHeader title={`Add Schema Field`} />
      <Box>
        <Form
          fields={formFields}
          onSubmit={handleFormSubmit}
          footer={buttonRow}
        />
      </Box>
    </Page>
  );
};
AddSchemaField.propTypes = {};
AddSchemaField.defaultProps = {};

export default AddSchemaField;
