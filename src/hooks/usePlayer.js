import { useContext } from 'react';

import { CampaignContext, UserContext } from '../contexts';

const usePlayer = () => {
  const [user] = useContext(UserContext);
  const { players } = useContext(CampaignContext);

  const currentPlayer = players.find(p => p.user === user.uid);

  return [
    currentPlayer,
  ];
};

export default usePlayer;
