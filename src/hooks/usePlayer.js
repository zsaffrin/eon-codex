import useCampaign from './useCampaign';
import useUser from './useUser';

const usePlayer = () => {
  const { players } = useCampaign();
  const [user] = useUser();

  const player = players.find(p => p.user === user.id);
  
  return [player];
};

export default usePlayer;
