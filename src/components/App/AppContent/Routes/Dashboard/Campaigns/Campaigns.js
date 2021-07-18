import { useUser, useBoolState, useCollection } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Loading, Modal, TitleRow } from '../../../../../ui';
import CampaignList from './CampaignList';
import NewCampaign from './NewCampaign';

const Campaigns = () => {
  const [isAdding, toggleIsAdding] = useBoolState();
  const [user] = useUser();
  const [players, isPlayersLoading] = useCollection('players', ["user","==",user.uid]);
  const [campaigns, isCampaignsLoading] = useCollection('campaigns');

  if (isPlayersLoading || isCampaignsLoading) {
    return <Loading />;
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
        <ButtonRow>
          <Button small onClick={toggleIsAdding}>New Campaign</Button>
        </ButtonRow>
      </TitleRow>
      <CampaignList campaigns={userCampaigns} />
    </Box>
  );
};

export default Campaigns;
