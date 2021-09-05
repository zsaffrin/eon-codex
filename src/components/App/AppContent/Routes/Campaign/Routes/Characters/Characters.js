import { useParams, Redirect } from 'react-router-dom';

import { useCampaign } from '../../../../../../../hooks';
import CharactersHome from './CharactersHome';
import Character from './Character';

const Characters = () => {
  const { key, characters } = useCampaign();
  const { characterId } = useParams();

  const character = characters.find(({ id }) => id === characterId);

  if (characterId && !character) {
    return <Redirect to={`/campaign/${key}/characters`} />;
  }

  if (characterId) {
    return character
      ? <Character character={character} />
      : <Redirect to={`/campaign/${key}/characters`} />;
  }

  return <CharactersHome />;
};

export default Characters;
