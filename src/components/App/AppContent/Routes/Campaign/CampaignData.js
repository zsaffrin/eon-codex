import { CampaignProvider } from '../../../../../contexts';
import { useCollection, useCampaignCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import { sortByKey } from '../../../../../utilities';

const CampaignDataProvider = ({ campaign, children }) => {
  const [articleCategories, articleCategoriesLoading] = useCampaignCollection('articleCategories', campaign.id);
  const [articles, articlesLoading] = useCampaignCollection('articles', campaign.id);
  const [characters, charactersLoading] = useCampaignCollection('characters', campaign.id);
  const [invitations, invitationsLoading] = useCampaignCollection('invitations', campaign.id);
  const [locations, locationsLoading] = useCampaignCollection('gamingLocations', campaign.id);
  const [players, playersLoading] = useCampaignCollection('players', campaign.id);
  const [sessions, sessionsLoading] = useCampaignCollection('sessions', campaign.id);
  const [users, usersLoading] = useCollection('users');

  if (
    articleCategoriesLoading
    || articlesLoading
    || charactersLoading
    || invitationsLoading
    || locationsLoading
    || playersLoading
    || sessionsLoading
    || usersLoading
  ) {
    return <Loading />;
  }
  
  const updatedPlayers = players.map((player) => {
    const playerUser = users.find(({ id }) => id === player.user);
    return (playerUser
      ? {
        ...player,
        name: player.name || playerUser.name || playerUser.email,
        userName: playerUser.name,
        userEmail: playerUser.email,
      }
      : player);
  });

  const updatedInvitations = invitations.map((invitation) => {
    const invitedByPlayer = updatedPlayers.find(({ id }) => id === invitation.invitedBy);
    return (invitedByPlayer
      ? {
        ...invitation,
        invitedByName: invitedByPlayer.name,
        invitedByEmail: invitedByPlayer.email,
      }
      : invitation);
  });

  const updatedCharacters = characters.map((character) => {
    const characterPlayer = updatedPlayers.find(({ id }) => id === character.player);
    return (characterPlayer
      ? {
        ...character,
        playerName: characterPlayer.name,
        playerEmail: characterPlayer.email,
      }
      : character);
  });

  const updatedSessions = sortByKey(sessions, 'date').map((session, index) => {
    const location = locations.find(({ id }) => id === session.location);
    
    return ({
      ...session,
      locationName: location ? location.name : null,
      sessionNumber: index,
    });
  });

  const campaignData = {
    ...campaign,
    articleCategories,
    articles,
    characters: sortByKey(updatedCharacters, 'name'),
    invitations: sortByKey(updatedInvitations, 'createdDate'),
    locations,
    players: sortByKey(updatedPlayers, 'name'),
    sessions: updatedSessions,
  };
  
  return (
    <CampaignProvider campaign={campaignData}>
      {children}
    </CampaignProvider>
  );
};

export default CampaignDataProvider;
