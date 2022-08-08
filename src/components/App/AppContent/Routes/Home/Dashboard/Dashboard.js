import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

import { Box, Button, Page, PageHeader } from '../../../../../ui';
import Campaigns from './Campaigns';
import PendingInvitations from './PendingInvitations';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <PageHeader
        title="Dashboard"
        content={(
          <Button
            small
            icon={<FaCog />}
            label="App Setup"
            onClick={() => navigate('/setup')}
          />
        )}
      />
      <PendingInvitations />
      <Box>
        <Campaigns />
      </Box>
    </Page>
  );
};

export default Dashboard;
