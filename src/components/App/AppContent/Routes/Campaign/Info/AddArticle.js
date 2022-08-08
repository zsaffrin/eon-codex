import { func } from 'prop-types';

import { useCampaign, useFirebase, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../ui';

const AddArticle = ({ contextCategoryId, close }) => {
  const { id: campaignId } = useCampaign();
  const [schema, schemaLoading] = useSchema('articles');
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
    
    addDocument('articles', docToAdd)
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
    if (contextCategoryId && fieldToAdd.key === 'category') {
      fieldToAdd.defaultValue = contextCategoryId;
    }

    return showInEditor && !excludeFields.includes(key)
      ? [ ...acc, fieldToAdd ]
      : acc;
  }, []);

  const buttonRow = (
    <ButtonRow>
      <Button primary label="Add Article" type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
    </ButtonRow>
  );

  return (
    <Page>
      <PageHeader title="New Article" />
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
AddArticle.propTypes = {
  close: func,
};
AddArticle.defaultProps = {
  close: () => {},
};

export default AddArticle;
