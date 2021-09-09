import { useParams, Redirect } from 'react-router-dom';

import { useCampaign } from '../../../../../../../hooks';
import PlayersHome from './PlayersHome/PlayersHome';
import Player from './Player';

const Players = () => {
  const { key, players } = useCampaign();
  const { playerId } = useParams();

  const player = players.find(({ id }) => id === playerId);

  if (playerId && !player) {
    return <Redirect to={`/campaign/${key}/players`} />;
  }

  if (playerId) {
    return player
      ? <Player player={player} />
      : <Redirect to={`/campaign/${key}/players`} />;
  }

  return <PlayersHome />;
};

export default Players;
