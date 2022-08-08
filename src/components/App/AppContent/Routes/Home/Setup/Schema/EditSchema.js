import { func, shape } from "prop-types";

import { useFirebase, useMessage, useSchema, useToggle } from '../../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../../ui';

const EditSchema = ({ close, data }) => {
  const [schema, isSchemaLoading] = useSchema('schemas');
  const [isDeleting, toggleIsDeleting] = useToggle();
  const { deleteDocument, updateDocument } = useFirebase();
  const [message, setMessage] = useMessage();

  if (isSchemaLoading) {
    return <Loading />;
  }

  const handleCancel = () => {
    close();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDocument('schemas', data.id);
      close();
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await updateDocument('schemas', data.id, formData);
      close();
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };

  const formFields = schema.fields
    ? schema.fields.reduce((acc, field) => {
      return field.showInEditor
        ? [ ...acc, field ]
        : acc;
    }, [])
    : [];

  const buttonRow = isDeleting
    ? (
      <>
        <div>
          Are you sure want to delete this schema?
          <br />
          This action is permanent and cannot be undone
        </div>
        <ButtonRow>
          <Button danger label="Yes, Delete" onClick={handleDelete} />
          <Button label="Nope, Nevermind" onClick={toggleIsDeleting} />
        </ButtonRow>
      </>
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
      <PageHeader title="Edit Schema" />
      <Box>
        {message}
        <Form
          fields={formFields}
          data={data}
          onSubmit={handleFormSubmit}
          footer={buttonRow}
        />
      </Box>
    </Page>
  );
};
EditSchema.propTypes = {
  close: func,
  data: shape({}),
};
EditSchema.defaultProps = {
  close: () => {},
  data: {},
};

export default EditSchema;
