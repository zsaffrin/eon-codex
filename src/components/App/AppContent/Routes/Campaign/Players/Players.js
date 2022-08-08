import { useCampaign } from '../../../../../../hooks';
import { Box, HeaderRow, Page, PageHeader } from '../../../../../ui';
import Invitations from './Invitations';
import PlayerList from './PlayerList';

const Players = () => {
  const { key: campaignKey, players } = useCampaign();
  
  return (
    <Page>
      <PageHeader
        title="Players"
        campaignKey={campaignKey}
        breadcrumbs={[]}
      />
      <Box>
        <HeaderRow title="Players" />
        <PlayerList players={players} />
      </Box>
      <Box>
        <Invitations />
      </Box>
    </Page>
  );
};

export default Players;
