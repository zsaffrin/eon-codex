import { useParams } from 'react-router-dom';

import { Redirect } from 'react-router-dom';

import { useCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import CampaignError from './CampaignError';
import CampaignDataProvider from './CampaignDataProvider';
import Header from './Header';
import Routes from './Routes';

const Campaign = () => {
  const { campaignKey } = useParams();
  const [campaigns, campaignsLoading] = useCollection('campaigns');

  if (campaignsLoading) {
    return <Loading />;
  }

  if (!campaigns) {
    return <CampaignError />;
  }

  const campaign = campaigns.find(({ key }) => key === campaignKey);

  if (campaigns && !campaign) { return <Redirect to="/" />; }

  return (
    <CampaignDataProvider campaign={campaign}>
      <Header />
      <Routes />
    </CampaignDataProvider>
  );
};

export default Campaign;
