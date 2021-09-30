import { useFirebase, useMessage, useToggle, useUser } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H } from '../../../../../ui';

const Invitations = ({ invitations }) => {
  const [message, setMessage] = useMessage();
  const [user] = useUser();
  const firebase = useFirebase();
  const [showIgnored, toggleShowIgnored] = useToggle();

  const updateInviteStatus = async (invitationId, newStatus) => {
    try {
      const res = await firebase.updateDoc(`invitations/${invitationId}`, {
        status: newStatus,
      });
      if (res.status === 'error') {
        setMessage('error', res.result);
      } else if (res.status !== 'success') {
        setMessage('error', 'Something went wrong');
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };

  const acceptInvite = (invite) => {
    firebase.addDoc('players', {
      campaign: invite.campaign,
      name: user.name,
      isOwner: false,
      isEditor: false,
      user: user.uid,
    }).then(() => {
      updateInviteStatus(invite.id, 'accepted');
    });
  };
  const ignoreInvite = (id) => {
    updateInviteStatus(id, 'ignored');
  };
  const declineInvite = (id) => {
    updateInviteStatus(id, 'declined');
  };

  const pendingInvites = invitations.filter(({ status }) => status === 'pending');
  const ignoredInvites = invitations.filter(({ status }) => status === 'ignored');
    
  const pendingInviteRows = pendingInvites.map((i) => {
    const { campaign, campaignName, id, invitedByPlayerName } = i;

    return (
      <div key={campaign}>
        {`You have been invited by ${invitedByPlayerName} to join the ${campaignName} Campaign!`}
        <ButtonRow compact>
          <Button tiny primary onClick={() => acceptInvite(i)}>Accept</Button>
          <Button tiny onClick={() => ignoreInvite(id)}>Ignore</Button>
          <Button tiny danger onClick={() => declineInvite(id)}>Decline</Button>
        </ButtonRow>
      </div>
    );
  });
  const ignoredInviteRows = ignoredInvites.map((i) => {
    const { campaign, campaignName, id, invitedByPlayerName } = i;

    return (
      <div key={campaign}>
        {`You have been invited by ${invitedByPlayerName} to join the ${campaignName} Campaign!`}
        <ButtonRow compact>
          <Button tiny primary onClick={() => acceptInvite(id)}>Accept</Button>
          <Button tiny danger onClick={() => declineInvite(id)}>Decline</Button>
        </ButtonRow>
      </div>
    );
  });
  
  return (
    <Box>
      <H l={2} compact>Invitations</H>
      {message}
      {pendingInvites.length > 0 ? pendingInviteRows : 'No pending invitations'}
      {showIgnored
        ? (
          <div>
            {ignoredInviteRows}
            <ButtonRow>
              <Button tiny onClick={toggleShowIgnored}>Hide Ignored</Button>
            </ButtonRow>
          </div>
        )
        : (
          <ButtonRow>
            <Button tiny onClick={toggleShowIgnored}>{`Show ${ignoredInvites.length} Ignored`}</Button>
          </ButtonRow>
        )
      }
    </Box>
  );
};

export default Invitations;
