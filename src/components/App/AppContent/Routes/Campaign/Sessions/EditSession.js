import { func, shape } from 'prop-types';

import { useFirebase, useMessage, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../ui';

const EditSession = ({ close, valueState }) => {
  const [schema, schemaLoading] = useSchema('sessions');
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

    if (field.key === 'participants') {
      return [
        ...acc,
        {
          ...field,
          lookupFilterKey: 'campaign',
          lookupFilterValue: valueState.campaign,
        }
      ];
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
      <PageHeader title="Edit Session" />
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
EditSession.propTypes = {
  close: func,
  valueState: shape({}),
};
EditSession.defaultProps = {
  close: () => {},
};

export default EditSession;
