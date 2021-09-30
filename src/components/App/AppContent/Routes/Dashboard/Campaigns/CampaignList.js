import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { useCollection, useUser } from '../../../../../../hooks';
import { Loading } from '../../../../../ui';

const StyledItem = styled.div(({ theme }) => {
  const { space } = theme;
  
  //TODO: This needs better style and to use theming
  return `
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    grid-gap: ${space.md};
    padding: ${space.sm};
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `;
});
const Charm = styled.div(({ theme, highlight }) => {
  const { text } = theme;
  
  return `
    color: ${highlight ? text.highlightColor : 'inherit'};
    display: grid;
    align-items: center;
  `;
});

const CampaignList = ({ campaigns }) => {
  const history = useHistory();
  const [user] = useUser();
  const [players, isPlayersLoading] = useCollection('players');

  if (isPlayersLoading) {
    return <Loading />;
  }
  
  const listItems = campaigns.map(({ key, id, name }) => {
    const campaignPlayer = players.find(p => (
      p.user === user.uid && p.campaign === id
    ));
    
    return (
      <StyledItem key={id} onClick={() => history.push(`/campaign/${key}`)}>
        {name || ''}
        {campaignPlayer.isOwner && (
          <Charm highlight>
            <AiFillStar title="Owner" />
          </Charm>
        )}
        {!campaignPlayer.isOwner && campaignPlayer.isEditor && (
          <Charm>
            <AiFillStar title="Editor" />
          </Charm>
        )}
      </StyledItem>
    );
  });
  
  return (
    <div>
      {listItems}
    </div>
  );
};

export default CampaignList;
