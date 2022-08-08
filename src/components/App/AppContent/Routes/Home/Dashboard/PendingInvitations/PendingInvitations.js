import { arrayOf, shape, string } from 'prop-types';

import { useCollection, useUser } from '../../../../../../../hooks';
import Invitation from './Invitation';

const PendingInvitations = () => {
  const [user] = useUser();
  const [invitations, invitationsLoading] = useCollection('invitations', ['email', '==', user.email]);
  const [campaigns, campaignsLoading] = useCollection('campaigns');

  if (invitationsLoading || campaignsLoading) {
    return null;
  }

  const invitationNodes = invitations.reduce((acc, invitation) => {
    const invitedCampaign = campaigns.find(({ id }) => id === invitation.campaign);

    if (invitation.status !== 'pending') {
      return acc;
    }

    return [
      ...acc,
      (
        <Invitation
          campaign={invitedCampaign}
          invitation={invitation}
          key={invitation.id}
        />
      ),
    ];
  }, []);

  return (
    <div>
      {invitationNodes}
    </div>
  );
};
PendingInvitations.propTypes = {
  invitations: arrayOf(shape({
    id: string.isRequired,
    campaignData: shape({}),
  })),
};
PendingInvitations.defaultProps = {
  invitations: [],
};

export default PendingInvitations;
