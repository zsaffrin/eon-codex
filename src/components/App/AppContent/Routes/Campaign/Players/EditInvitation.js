import { useCampaign, useFirebase, useMessage, useToggle } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Page, PageHeader } from '../../../../../ui';

const EditInvitation = ({ close, schema, valueState }) => {
  const [isDeleting, toggleIsDeleting] = useToggle();
  const [message, setMessage] = useMessage();
  const { deleteDocument, updateDocument } = useFirebase();
  const { id: campaignId } = useCampaign();

  const handleCancel = () => {
    close();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDocument(schema.id, valueState.id);
      close();
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await updateDocument(schema.id, valueState.id, formData);
      close();
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };

  const formFields = schema.fields.reduce((acc, field) => {
    if (!field.showInEditor || field.key === 'campaign') {
      return acc;
    }

    if (field.key === 'invitedBy') {
      return [
        ...acc,
        {
          ...field,
          lookupFilterKey: 'campaign',
          lookupFilterValue: campaignId,
        },
      ];
    }
    
    return [ ...acc, field ];
  }, []);

  const bottomRow = isDeleting
    ? (
      <ButtonRow>
        <Button danger label="Yes, Delete" onClick={handleDelete} />
        <Button label="Nope, Nevermind" onClick={toggleIsDeleting} />
      </ButtonRow>
    )
    : (
      <ButtonRow>
        <Button primary label="Save" type="submit" />
        <Button label="Cancel" onClick={handleCancel} />
        <Button danger label="Delete" onClick={toggleIsDeleting} />
      </ButtonRow>
    );

  return (
    <Page>
      <PageHeader title="Edit Invitation" />
      <Box>
        {message}
        <Form
          fields={formFields}
          data={valueState}
          onSubmit={handleFormSubmit}
          footer={bottomRow}
        />
      </Box>
    </Page>
  );
};

export default EditInvitation;