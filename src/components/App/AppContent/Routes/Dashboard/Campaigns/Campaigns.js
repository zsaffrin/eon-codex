import { useUser, useCollection, useToggle } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Loading, Message, Modal, TitleRow } from '../../../../../ui';
import CampaignList from './CampaignList';
import NewCampaign from './NewCampaign';

const Campaigns = () => {
  const [isAdding, toggleIsAdding] = useToggle();
  const [user] = useUser();
  const [players, isPlayersLoading] = useCollection('players', ["user","==",user.uid]);
  const [campaigns, isCampaignsLoading] = useCollection('campaigns');

  if (isPlayersLoading || isCampaignsLoading) {
    return <Loading />;
  }

  if (!players || !campaigns) {
    return (
      <Message type="error">
        <p>Error loading data</p>
        <p>You are offline or the database is unavailable</p>
      </Message>
    );
  }

  const userCampaigns = players.map(({ campaign }) => (
    campaigns.find(c => c.id === campaign)
  ));

  return (
    <Box>
      {isAdding && (
        <Modal>
          <NewCampaign close={toggleIsAdding} />
        </Modal>
      )}
      <TitleRow>
        <H l={2} compact>Campaigns</H>
        <ButtonRow compact>
          <Button onClick={toggleIsAdding}>New Campaign</Button>
        </ButtonRow>
      </TitleRow>
      <CampaignList campaigns={userCampaigns} />
    </Box>
  );
};

export default Campaigns;
