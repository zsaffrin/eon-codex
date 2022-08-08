import { shape, string } from "prop-types";
import styled from 'styled-components';

import { useCampaign } from '../../../../../../../hooks';
import { Link } from '../../../../../../ui';

const StyledItem = styled(Link)(({ theme }) => {
  const { box, color, layout, space } = theme;

  return `
    background: ${box.background};
    border: 1px solid ${box.mutedBorderColor};
    border-radius: ${layout.borderRadius};
    padding: ${space.lg};
    color: inherit;
    display: grid;
    align-items: center;
    min-height: 4em;

    &:hover {
      border-color: ${color.secondary};
      color: inherit;
      text-decoration: none;
    }
  `;
});
const ItemName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
`;

const ParticipantListItem = ({ character }) => {
  const { key: campaignKey } = useCampaign();
  const { id: characterId, name } = character;
  
  return (
    <StyledItem to={`/campaign/${campaignKey}/character/${characterId}`}>
      <ItemName>{name}</ItemName>
    </StyledItem>
  );
};
ParticipantListItem.propTypes = {
  character: shape({
    name: string,
  }),
};
ParticipantListItem.defaultProps = {
  character: {},
};

export default ParticipantListItem;
