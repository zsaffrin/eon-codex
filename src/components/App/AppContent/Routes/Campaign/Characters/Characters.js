import { FaPlus, FaUserCircle } from 'react-icons/fa';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import styled from 'styled-components';

import { useCampaign, useCloudinary, useToggledModal } from '../../../../../../hooks';
import { Box, Button, H, ItemList, Page, PageHeader } from '../../../../../ui';
import AddCharacter from './AddCharacter';

const StyledItem = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    padding: ${space.md};
    display: grid;
    align-items: center;
    grid-gap: ${space.lg};
    grid-template-columns: min-content 1fr;
  `;
});
const ImagePlaceholder = styled.div(({ theme }) => {
  const { color } = theme;

  return `
    height: 50px;
    width: 50px;
    display: grid;
    align-items: center;
    justify-items: center;
    font-size: 2rem;
    color: ${color.gray};
  `;
});

const Characters = () => {
  const { key: campaignKey, characters } = useCampaign();
  const [addModal, toggleAddModal] = useToggledModal(AddCharacter);
  const { cloudinaryUrlGen } = useCloudinary();

  const listItems = characters.map(({ id, name, playerName, imagePublicId }) => {
    const charImg = cloudinaryUrlGen.image(imagePublicId);
    charImg.resize(thumbnail().width(50).height(50));
    
    return ({
      key: id,
      content: (
        <StyledItem>
          {imagePublicId
            ? <AdvancedImage cldImg={charImg} />
            : (
                <ImagePlaceholder>
                  <FaUserCircle />
                </ImagePlaceholder>
              )
          }
          <div>
            <H l={3} compact>{name}</H>
            <div>{`Played by ${playerName}`}</div>
          </div>
        </StyledItem>
      ),
      to: `/campaign/${campaignKey}/character/${id}`,
    });
  });
  
  return (
    <Page>
      {addModal}
      <PageHeader
        title="Characters"
        content={(
          <Button
            primary
            small
            icon={<FaPlus />}
            label="New Character"
            onClick={toggleAddModal}
          />
        )}
        campaignKey={campaignKey}
        breadcrumbs={[]}
      />
      <Box>
        <ItemList isLinks items={listItems} />
      </Box>
    </Page>
  );
};

export default Characters;
