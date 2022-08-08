import { func, shape, string } from 'prop-types';
import { useState } from 'react';

import { useFirebase, useMessage } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Input, Page, PageHeader } from '../../../../../ui';

const EditSessionMdField = ({ close, valueState }) => {
  const [fieldContent, setFieldContent] = useState(valueState.record[valueState.fieldKey] || '');
  const [message, setMessage] = useMessage();
  const { updateDocument } = useFirebase();

  const handleCancel = () => {
    close();
  };

  const handleFieldChange = ({ value }) => {
    setFieldContent(value);
  };

  const handleSave = async (e) => {
    try {
      await updateDocument(valueState.record.collectionId, valueState.record.id, {
        [valueState.fieldKey]: fieldContent,
      });
      close();
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };
  
  return (
    <Page>
      {message}
      <PageHeader title={valueState.pageTitle || 'Edit Field'} />
      <Box>
        <div>
          <Input
            type="longtext"
            height="10em"
            value={fieldContent}
            onChange={handleFieldChange}
          />
        </div>
        <ButtonRow>
          <Button primary label="Save" type="submit" onClick={handleSave} />
          <Button label="Cancel" onClick={handleCancel} />
        </ButtonRow>
      </Box>
    </Page>
  );
};
EditSessionMdField.propTypes = {
  close: func,
  valueState: shape({
    record: shape({
      id: string,
      collectionId: string,
      pageTitle: string,
    }),
    fieldKey: string,
  }).isRequired,
};
EditSessionMdField.defaultProps = {
  close: () => {},
};

export default EditSessionMdField;
