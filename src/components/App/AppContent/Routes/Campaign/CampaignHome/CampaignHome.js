import { useCampaign } from '../../../../../../hooks';
import { Box, Page, PageHeader, VerticalList } from '../../../../../ui';

const CampaignHome = () => {
  const {
    characters,
    invitations,
    locations,
    players,
    sessions
  } = useCampaign();

  return (
    <Page>
      <PageHeader title="Campaign Home" />
      <Box>
        <VerticalList
          items={[
            { label: 'characters', content: characters.length },
            { label: 'invitations', content: invitations.length },
            { label: 'locations', content: locations.length },
            { label: 'players', content: players.length },
            { label: 'sessions', content: sessions.length },
          ]}
        />
      </Box>
    </Page>
  );
};

export default CampaignHome;
