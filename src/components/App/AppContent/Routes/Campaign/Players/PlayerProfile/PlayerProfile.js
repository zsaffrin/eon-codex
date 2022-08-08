import { Navigate, useParams } from 'react-router-dom';

import { useCampaign } from '../../../../../../../hooks';
import { Box, Page, PageHeader } from '../../../../../../ui';
import PlayerCharacters from './PlayerCharacters';

const PlayerProfile = () => {
  const { playerId } = useParams();
  const { key: campaignKey, players, characters } = useCampaign();

  const player = players.find(({ id }) => playerId === id);

  if (!playerId || !player) {
    return <Navigate to={`/campaign/${campaignKey}/players`} />;
  }

  const playerCharacters = characters.filter(
    ({ player: playerId }) => playerId === player.id
  );
  
  return (
    <Page>
      <PageHeader
        title={player.name}
        subtitle={player.userEmail}
        campaignKey={campaignKey}
        breadcrumbs={[{
          label: 'Players',
          target: `/campaign/${campaignKey}/players`,
        }]}
      />
      <Box>
        <PlayerCharacters characters={playerCharacters} />
      </Box>
    </Page>
  );
};

export default PlayerProfile;
