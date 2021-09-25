import { CampaignProvider } from '../../../../../contexts';
import { useCampaignCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import { sortBy } from '../../../../../utilities';

const CampaignDataProvider = ({ campaign, children }) => {
  const [characters, charactersLoading] = useCampaignCollection('characters', campaign.id);
  const [invitations, invitationsLoading] = useCampaignCollection('invitations', campaign.id);
  const [locations, locationsLoading] = useCampaignCollection('gamingLocations', campaign.id);
  const [players, playersLoading] = useCampaignCollection('players', campaign.id);
  const [sessions, sessionsLoading] = useCampaignCollection('sessions', campaign.id);

  if (
    charactersLoading
    || invitationsLoading
    || locationsLoading
    || playersLoading
    || sessionsLoading
  ) {
    return <Loading />;
  }

  const campaignData = {
    ...campaign,
    characters: sortBy(characters, 'name'),
    invitations,
    locations,
    players: sortBy(players, 'name'),
    sessions,
  };
  
  return (
    <CampaignProvider campaign={campaignData}>
      {children}
    </CampaignProvider>
  );
};

export default CampaignDataProvider;
