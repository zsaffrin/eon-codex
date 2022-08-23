import { shape, string } from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import styled from 'styled-components';

import { useCampaign, useCloudinary } from '../../../../../../../hooks';
import { Link } from '../../../../../../ui';

const StyledItem = styled(Link)(({ theme }) => {
  const { box, color, layout, space } = theme;

  return `
    background: ${box.background};
    border: 1px solid ${box.mutedBorderColor};
    border-radius: ${layout.borderRadius};
    padding: ${space.md};
    color: inherit;
    display: grid;
    grid-gap: ${space.md};
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
  const { id: characterId, name, imagePublicId } = character;
  const { cloudinaryUrlGen } = useCloudinary();

  const charImg = cloudinaryUrlGen.image(imagePublicId);
  charImg.resize(thumbnail().width(100).height(100));
  
  return (
    <StyledItem to={`/campaign/${campaignKey}/character/${characterId}`}>
      {imagePublicId && <AdvancedImage cldImg={charImg} />}
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
