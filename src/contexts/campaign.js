import { createContext } from 'react';

const CampaignContext = createContext();

const CampaignProvider = ({ campaign, children }) => {
  return (
    <CampaignContext.Provider value={campaign}>
      {children}
    </CampaignContext.Provider>
  );
};

export { CampaignContext, CampaignProvider };
