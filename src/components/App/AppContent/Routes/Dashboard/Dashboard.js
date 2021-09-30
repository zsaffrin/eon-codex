import { useCollection, useUser } from '../../../../../hooks';
import { H, Loading, Page } from '../../../../ui';
import Header from './Header';
import Campaigns from './Campaigns';
import Invitations from './Invitations';

const Dashboard = () => {
  const [user] = useUser();
  const [invitations, invitationsLoading] = useCollection('invitations', ['email','==',user.email]);

  if (invitationsLoading) {
    return <Loading />;
  }

  const isInvitations = () => {
    const activeInvites = invitations.filter(i => (
      i.status === 'pending'
      || i.status === 'ignored'
    ));

    return activeInvites.length > 0;
  };
  
  return (
    <>
      <Header />
      <Page>
        <H l={1} compact>{`Welcome back, ${user.name || 'adventurer'}`}</H>
        {isInvitations() && <Invitations invitations={invitations} />}
        <Campaigns />
      </Page>
    </>
  );
};

export default Dashboard;
