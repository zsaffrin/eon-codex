import { Navigate, Routes, Route, useParams } from 'react-router-dom';

import { useCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import CampaignData from './CampaignData';
import CampaignError from './CampaignError';
import CampaignHome from './CampaignHome';
import Header from './Header';
import { Characters, Character } from './Characters';
import { Sessions, Session } from './Sessions';
import Players from './Players';
import PlayerProfile from './Players/PlayerProfile';
import { Info, InfoCategory } from './Info';

const Campaign = () => {
  const { campaignKey } = useParams();
  const [campaigns, campaignsLoading] = useCollection('campaigns');

  if (campaignsLoading) {
    return <Loading />;
  }

  const campaign = campaigns.find(({ key }) => key === campaignKey);

  if (!campaigns || (campaigns && !campaigns.length > 0)) {
    return (
      <CampaignError
        error="Error loading Campaigns data"
      />
    );
  }

  if (!campaign) {
    return (
      <CampaignError
        error="Campaign key not found. You followed a bad link or this Campaign does not exist"
      />
    );
  }

  return (
    <CampaignData campaign={campaign}>
      <Header />
      <Routes>
        <Route path="*" element={<CampaignHome />} />

        <Route path="character/:characterId" element={<Character />} />
        <Route path="character" element={<Navigate to={`/campaign/${campaign.key}/characters`} />} />
        <Route path="characters" element={<Characters />} />

        <Route path="player/:playerId" element={<PlayerProfile />} />
        <Route path="player" element={<Navigate to={`/campaign/${campaign.key}/players`} />} />
        <Route path="players" element={<Players />} />
        
        <Route path="session/:sessionId" element={<Session />} />
        <Route path="session" element={<Navigate to={`/campaign/${campaign.key}/sessions`} />} />
        <Route path="sessions" element={<Sessions />} />
        
        <Route path="info/:categoryKey/:articleId" exact element={<InfoCategory />} />
        <Route path="info/:categoryKey" exact element={<InfoCategory />} />
        <Route path="info" element={<Info />} />
      </Routes>
    </CampaignData>
  );
};

export default Campaign;
