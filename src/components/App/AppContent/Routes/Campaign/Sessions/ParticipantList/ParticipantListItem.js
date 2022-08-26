import { shape, string } from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
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
    align-items: start;
    min-height: 4em;

    &:hover {
      border-color: ${color.secondary};
      color: inherit;
      text-decoration: none;
    }
  `;
});
const ImagePlaceholder = styled.div(({ theme }) => {
  const { app, color } = theme;

  return `
    background: ${app.backgroundLevel[2]};
    color: ${color.gray};
    font-size: 2rem;
    display: grid;
    align-items: center;
    justify-items: center;
    height: 72px;
    width: 72px;
  `;
});
const CharacterName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
`;

const ParticipantListItem = ({ character }) => {
  const { key: campaignKey } = useCampaign();
  const { id: characterId, name, imagePublicId } = character;
  const { cloudinaryUrlGen } = useCloudinary();

  const charImg = cloudinaryUrlGen.image(imagePublicId);
  charImg.resize(thumbnail().width(72).height(72));
  
  return (
    <StyledItem to={`/campaign/${campaignKey}/character/${characterId}`}>
      {imagePublicId
        ? <AdvancedImage cldImg={charImg} />
        : (
            <ImagePlaceholder>
              <FaUserCircle />
            </ImagePlaceholder>
          )
      }
      <CharacterName>{name}</CharacterName>
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
