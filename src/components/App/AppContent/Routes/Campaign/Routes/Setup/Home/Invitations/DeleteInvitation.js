import styled from 'styled-components';

import { useFirebase, useMessage } from '../../../../../../../../../hooks';
import { Button, ButtonRow, H, Page } from '../../../../../../../../ui';

const Emphasis = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`;

const DeleteInvitation = ({ invitation, close }) => {
  const [message, setMessage] = useMessage();
  const firebase = useFirebase();

  const handleDelete = async () => {
    try {
      const res = await firebase.deleteDoc(`invitations/${invitation.id}`);
      switch (res.status) {
        case 'success':
          close();
          break;
        case 'error':
          setMessage('error', res.result);
          break;
        default:
          setMessage('error', 'Something went wrong');
          break;
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };
  
  return (
    <Page>
      <H l={1}>Cancel Invitation</H>
      <p>Are you sure you want to cancel this Invitation?</p>
      <Emphasis>{invitation.email}</Emphasis>
      {message}
      <ButtonRow>
        <Button danger onClick={handleDelete}>Cancel Invitation</Button>
        <Button onClick={close}>Never mind</Button>
      </ButtonRow>
    </Page>
  );
};

export default DeleteInvitation;
