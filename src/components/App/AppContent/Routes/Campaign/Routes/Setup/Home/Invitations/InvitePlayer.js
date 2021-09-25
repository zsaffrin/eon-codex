import { useState } from 'react';
import styled from 'styled-components';

import { isValidEmail } from '../../../../../../../../../utilities';
import { useAppData, useCampaign, useFirebase, useMessage, usePlayer } from '../../../../../../../../../hooks';
import { Button, ButtonRow, H, Input, Page, VerticalList } from '../../../../../../../../ui';

const StyledForm = styled.form(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;  
    grid-gap: ${space.lg};
  `;
});

const InvitePlayer = ({ close }) => {
  const [message, setMessage] = useMessage();
  const firebase = useFirebase();
  const { invitationStatuses } = useAppData();
  const { id: campaignId, invitations } = useCampaign();
  const [currentPlayer] = usePlayer();
  const [formData, setFormData] = useState({
    email: '',
  });

  const isFormValid = () => {
    if (!formData.email) {
      setMessage('error', 'Enter an email address');
      return false;
    }

    if (!isValidEmail(formData.email)) {
      setMessage('error', 'Email is not formatted properly');
      return false;
    }

    if (invitations.find(i => i.email === formData.email)) {
      setMessage('error', 'Invitation already pending for this email');
      return false;
    }
    
    return true;
  };

  const createInvitation = async () => {
    const recordToAdd = {
      ...formData,
      campaign: campaignId,
      invitedByPlayer: currentPlayer.id,
      status: invitationStatuses.find(({ name }) => name === 'Pending').id,
    };

    try {
      const res = await firebase.addDoc('invitations', recordToAdd);
      if (res.status === 'success') {
        close();
      } else if (res.status === 'error') {
        setMessage('error', res.result);
      } else {
        setMessage('error', 'Something went wrong');
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };

  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage();

    if (isFormValid()) {
      createInvitation();
    }
  };

  const listItems = [
    {
      label: 'Email',
      content: (
        <Input
          id="email"
          value={formData.email}
          onChange={handleFieldChange}
        />
      )
    }
  ];
  
  return (
    <Page>
      <H l={1}>Invite Player</H>
      <p>Invite a player to join this Campaign by entering their email.</p>
      <StyledForm onSubmit={handleSubmit}>
        {message}
        <VerticalList items={listItems} />
        <ButtonRow>
          <Button primary type="submit">Invite Player</Button>
          <Button onClick={close}>Cancel</Button>
        </ButtonRow>
      </StyledForm>
    </Page>
  );
};

export default InvitePlayer;
