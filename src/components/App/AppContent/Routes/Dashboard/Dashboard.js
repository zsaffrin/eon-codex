import { useUser } from '../../../../../hooks';
import { H, Page } from '../../../../ui';
import Header from './Header';
import Campaigns from './Campaigns';

const Dashboard = () => {
  const [user] = useUser();
  
  return (
    <>
      <Header />
      <Page>
        <H l={1} compact>{`Welcome back, ${user.name || 'adventurer'}`}</H>
        <Campaigns />
      </Page>
    </>
  );
};

export default Dashboard;
