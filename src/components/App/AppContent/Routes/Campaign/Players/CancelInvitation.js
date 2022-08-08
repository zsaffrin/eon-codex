import { func, shape } from 'prop-types';

import { useFirebase, useMessage } from '../../../../../../hooks';
import { Button, ButtonRow, Page, PageHeader } from '../../../../../ui';

const CancelInvitation = ({ close, valueState: invitation }) => {
  const { deleteDocument } = useFirebase();
  const [message, setMessage] = useMessage();

  const handleCancel = () => {
    close();
  };

  const handleSubmit = async () => {
    try {
      await deleteDocument('invitations', invitation.id);
      close();
    }
    catch (err) {
      setMessage('error', err.message);
    }
  };

  return (
    <Page>
      <PageHeader
        title="Cancel Invitation"
      />
      {message}
      <div>
        {`Cancel invitation for ${invitation.email}?`}
      </div>
      <ButtonRow>
        <Button danger label="Yes, cancel it" onClick={handleSubmit} />
        <Button label="No, keep it" onClick={handleCancel} />
      </ButtonRow>
    </Page>
  );
};
CancelInvitation.propTypes = {
  close: func,
  invitation: shape({

  })
};
CancelInvitation.defaultProps = {
  close: () => {},
  invitation: {},
};

export default CancelInvitation;
