import { useCampaign } from '../../../../../../../../hooks';

const Players = () => {
  const { players } = useCampaign();
  
  return (
    <div>
      {players.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default Players;
