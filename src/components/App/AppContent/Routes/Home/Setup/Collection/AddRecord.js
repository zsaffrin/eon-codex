import { useFirebase } from '../../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Page, PageHeader } from "../../../../../../ui";

const AddRecord = ({ close, schema }) => {
  const { addDocument, setDocument } = useFirebase();

  const handleCancel = () => {
    close();
  };

  const handleFormSubmit = (formData) => (
    schema.specifyId
      ? setDocument(schema.id, formData.id, formData)
        .then(() => close())
      : addDocument(schema.id, formData)
        .then(() => close())
  );

  const formFields = schema.fields.reduce((acc, field) => {
    return field.showInEditor
      ? [ ...acc, field ]
      : acc;
  }, []);
  if (schema.specifyId) {
    formFields.unshift({
      key: 'id',
      name: 'Id',
      type: 'text',
    });
  }

  const buttonRow = (
    <ButtonRow>
      <Button primary label={`Add ${schema.recordName}`} type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
    </ButtonRow>
  );

  return (
    <Page>
      <PageHeader title={`Add ${schema.recordName}`} />
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
AddRecord.propTypes = {};
AddRecord.defaultProps = {};

export default AddRecord;
