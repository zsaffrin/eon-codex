import { useContext } from 'react';

import { CampaignContext } from '../contexts';

const useCampaign = () => {
  const campaign = useContext(CampaignContext);
  
  return campaign;
};

export default useCampaign;
