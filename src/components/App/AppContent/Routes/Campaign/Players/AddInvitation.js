import { func, shape } from "prop-types";

import { useCampaign, useFirebase, useMessage, usePlayer } from '../../../../../../hooks';
import { Box, Button, ButtonRow, Form, Page, PageHeader } from '../../../../../ui';

const AddInvitation = ({ close, schema }) => {
  const { id: campaignId, players } = useCampaign();
  const [player] = usePlayer();
  const { addDocument } = useFirebase();
  const [message, setMessage] = useMessage();

  const handleCancel = () => {
    close();
  };

  const handleFormSubmit = (formData) => {
    setMessage();

    const existingPlayer = players.find(({ userEmail }) => userEmail === formData.email);

    if (existingPlayer) {
      return setMessage('error', 'This user is already a Player in this Campaign');
    }

    const docToAdd = {
      campaign: campaignId,
      invitedBy: player.id,
      status: 'pending',
      ...formData,
    };
    
    return addDocument('invitations', docToAdd)
      .then(() => close());
  };

  const excludeFields = ['campaign','status','invitedBy'];
  const formFields = schema.fields.reduce((acc, field) => {
    const { key, showInEditor } = field;

    return showInEditor && !excludeFields.includes(key)
      ? [ ...acc, field ]
      : acc;
  }, []);

  const buttonRow = (
    <ButtonRow>
      <Button primary label="Add Invitation" type="submit" />
      <Button label="Cancel" onClick={handleCancel} />
    </ButtonRow>
  );

  return (
    <Page>
      <PageHeader title={`Add ${schema.recordName}`} />
      {message}
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
AddInvitation.propTypes = {
  close: func,
  schema: shape({}),
};
AddInvitation.defaultProps = {
  close: () => {},
  schema: {},
};

export default AddInvitation;
