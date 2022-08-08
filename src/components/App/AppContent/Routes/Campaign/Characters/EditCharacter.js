import { func, shape } from 'prop-types';

import { useFirebase, useMessage, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../ui';

const EditCharacter = ({ close, valueState }) => {
  const [schema, schemaLoading] = useSchema('characters');
  const [message, setMessage] = useMessage();
  const { updateDocument } = useFirebase();

  if (schemaLoading) {
    return <Loading />;
  }
  
  const handleCancel = () => {
    close();
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

  const excludedFields = ['campaign', 'player'];
  const formFields = schema.fields.reduce((acc, field) => {
    if (!field.showInEditor || excludedFields.includes(field.key)) {
      return acc;
    }

    return [ ...acc, field ];
  }, []);

  const bottomRow = (
    <ButtonRow>
      <Button primary label="Save" type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
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
EditCharacter.propTypes = {
  close: func,
  valueState: shape({}),
};
EditCharacter.defaultProps = {
  close: () => {},
};

export default EditCharacter;
