import { shape } from 'prop-types';
import styled from 'styled-components';

import { useCampaign } from '../../../../../../hooks';
import { H, Link } from '../../../../../ui';

const StyledListItem = styled(Link)(({ theme }) => {
  const { app, layout, space } = theme;

  return `
    background: ${app.backgroundLevel[1]};
    border-radius: ${layout.borderRadius};
    display: block;
    padding: ${space.md};

    &:hover {
      background: ${app.backgroundLevel[2]};
      color: inherit;
    }
  `;
});
const ListItemLayout = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: 1fr max-content;
  `;
});
const SmallText = styled.div`
  font-size: 0.8em;
`;

const PlayerListItem = ({ player }) => {
  const { key: campaignKey } = useCampaign();
  
  return (
    <StyledListItem blended to={`/campaign/${campaignKey}/player/${player.id}`}>
      <ListItemLayout>
        <div>
          <H l={4} compact>{player.name}</H>
          <SmallText>{player.userEmail}</SmallText>
        </div>
      </ListItemLayout>
    </StyledListItem>
  );
};
PlayerListItem.propTypes = {
  player: shape({}),
};
PlayerListItem.defaultProps = {
  player: {},
};

export default PlayerListItem;
