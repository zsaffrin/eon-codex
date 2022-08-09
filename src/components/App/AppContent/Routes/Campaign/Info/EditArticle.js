import { func, shape } from 'prop-types';

import { useFirebase, useMessage, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../ui';

const EditArticle = ({ close, valueState }) => {
  const [schema, schemaLoading] = useSchema('articles');
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

  const excludedFields = ['campaign'];
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
      {message}
      <PageHeader title="Edit Article" />
      <Box>
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
EditArticle.propTypes = {
  close: func,
  valueState: shape({}),
};
EditArticle.defaultProps = {
  close: () => {},
};

export default EditArticle;
