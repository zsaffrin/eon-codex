import { func } from "prop-types";

import { useCampaign, useFirebase, usePlayer, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Loading, Page, PageHeader } from '../../../../../ui';

const AddCharacter = ({ close }) => {
  const { id: campaignId } = useCampaign();
  const [player] = usePlayer();
  const [schema, schemaLoading] = useSchema('characters');
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
      player: player.id,
    };
    
    addDocument('characters', docToAdd)
      .then(() => close());
  };

  const excludeFields = ['campaign', 'player'];
  const formFields = schema.fields.reduce((acc, field) => {
    const { key, showInEditor, type } = field;

    const fieldToAdd = { ...field };
    if (type === 'lookup') {
      fieldToAdd.lookupFilterKey = 'campaign';
      fieldToAdd.lookupFilterValue = campaignId;
    }
    if (key === 'player') {
      fieldToAdd.defaultValue = player.id;
    }

    return showInEditor && !excludeFields.includes(key)
      ? [ ...acc, fieldToAdd ]
      : acc;
  }, []);

  const buttonRow = (
    <ButtonRow>
      <Button primary label="Add Character" type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
    </ButtonRow>
  );

  return (
    <Page>
      <PageHeader title="New Character" />
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
AddCharacter.propTypes = {
  close: func,
};
AddCharacter.defaultProps = {
  close: () => {},
};

export default AddCharacter;
