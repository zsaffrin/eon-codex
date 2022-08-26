import { Navigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

import { useCampaign, useToggledModal } from '../../../../../../../hooks';
import { Box, Button, ButtonRow, Page, PageHeader } from '../../../../../../ui';
import PlayerCharacters from './PlayerCharacters';
import EditPlayer from './EditPlayer';

const PlayerProfile = () => {
  const { playerId } = useParams();
  const { key: campaignKey, players, characters } = useCampaign();
  const [editModal, toggleEditModal] = useToggledModal(EditPlayer);

  const player = players.find(({ id }) => playerId === id);

  if (!playerId || !player) {
    return <Navigate to={`/campaign/${campaignKey}/players`} />;
  }

  const playerCharacters = characters.filter(
    ({ player: playerId }) => playerId === player.id
  );
  
  return (
    <Page>
      {editModal}
      <PageHeader
        title={player.name}
        subtitle={player.userEmail}
        campaignKey={campaignKey}
        breadcrumbs={[{
          label: 'Players',
          target: `/campaign/${campaignKey}/players`,
        }]}
        content={(
          <ButtonRow compact>
            <Button
              small
              icon={<FaEdit />}
              label="Edit"
              onClick={() => toggleEditModal(player)}
            />
          </ButtonRow>
        )}
      />
      <Box>
        <PlayerCharacters characters={playerCharacters} player={player} />
      </Box>
    </Page>
  );
};

export default PlayerProfile;
