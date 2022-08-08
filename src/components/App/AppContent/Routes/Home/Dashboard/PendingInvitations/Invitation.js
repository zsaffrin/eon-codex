import { useState } from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

import { useCollection, useFirebase, useUser } from '../../../../../../../hooks';
import { Box, Button, ButtonRow } from '../../../../../../ui';

const BoxLayout = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-gap: ${space.md};
    align-items: center;
  `;
});

const Invitation = ({ campaign, invitation }) => {
  const firebase = useFirebase();
  const [user] = useUser();
  const [players, playersLoading] = useCollection('players', ['campaign','==',campaign.id]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (playersLoading) {
    return null;
  }

  const updateInvitation = (newStatus) => {
    return firebase.updateDocument('invitations', invitation.id, {
      status: newStatus,
    });
  };

  const insertPlayer = () => {
    const existingPlayer = players.find(({ user: playerUser }) => playerUser === user.id);

    return existingPlayer ? true : firebase.addDocument('players', {
      campaign: campaign.id,
      user: user.id,
    });
  };
  
  const acceptInvitation = () => {
    setIsProcessing(true);
    try {
      insertPlayer();
      updateInvitation('accepted');
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const declineInvitation = async () => {
    setIsProcessing(true);
    try {
      await updateInvitation('declined');
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };
  
  return (
    <Box highlighted key={invitation.id}>
      <BoxLayout>
        <div>
          {`You have been invited to join campaign ${campaign.name}`}
        </div>
        <ButtonRow compact justify="start">
          <Button primary small label="Join" onClick={acceptInvitation} disabled={isProcessing} />
          <Button small label="Decline" onClick={declineInvitation} disabled={isProcessing} />
        </ButtonRow>
      </BoxLayout>
    </Box>
  );
};
Invitation.propTypes = {
  invitation: shape({
    id: string,
  }),
  campaign: shape({
    name: string,
    id: string.isRequired,
  }),
  
};
Invitation.defaultProps = {
  invitation: {
    id: null,
  },
  campaign: {
    name: null,
  },
};

export default Invitation;
