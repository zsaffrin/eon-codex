import { func, number, oneOfType, shape, string } from 'prop-types';

import { useFirebase, useMessage, useToggle } from '../../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Page, PageHeader } from '../../../../../../ui';

const EditRecord = ({ close, valueState, schema }) => {
  const [isDeleting, toggleIsDeleting] = useToggle();
  const { deleteDocument, updateDocument } = useFirebase();
  const [message, setMessage] = useMessage();

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
    return field.showInEditor
      ? [ ...acc, field ]
      : acc;
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
      <PageHeader title={`Edit ${schema.recordName}`} />
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
EditRecord.propTypes = {
  close: func,
  valueState: oneOfType([string, number, shape({})]),
};
EditRecord.defaultProps = {
  close: () => {},
};

export default EditRecord;
