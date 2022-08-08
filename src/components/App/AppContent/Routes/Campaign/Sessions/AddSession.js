import { func } from "prop-types";

import { useCampaign, useFirebase, useSchema } from '../../../../../../hooks';
import { Button, ButtonRow, Box, Form, Loading, Page, PageHeader } from '../../../../../ui';

const AddSession = ({ close }) => {
  const { id: campaignId } = useCampaign();
  const [schema, schemaLoading] = useSchema('sessions');
  const { addDocument } = useFirebase();

  if (schemaLoading) {
    return <Loading />;
  }

  const handleCancel = () => {
    close();
  };

  const handleFormSubmit = (formData) => {
    const docToAdd = {
      campaign: campaignId,
      ...formData,
    };
    
    addDocument('sessions', docToAdd)
      .then(() => close());
  };

  const excludeFields = ['campaign'];
  const formFields = schema.fields.reduce((acc, field) => {
    const { lookup, key, showInEditor } = field;

    const fieldToAdd = { ...field };
    if (lookup) {
      fieldToAdd.lookupFilterKey = 'campaign';
      fieldToAdd.lookupFilterValue = campaignId;
    }

    return showInEditor && !excludeFields.includes(key)
      ? [ ...acc, fieldToAdd ]
      : acc;
  }, []);

  const buttonRow = (
    <ButtonRow>
      <Button primary label="Add Session" type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
    </ButtonRow>
  );

  return (
    <Page>
      <PageHeader title="New Session" />
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
AddSession.propTypes = {
  close: func,
};
AddSession.defaultProps = {
  close: () => {},
};

export default AddSession;
