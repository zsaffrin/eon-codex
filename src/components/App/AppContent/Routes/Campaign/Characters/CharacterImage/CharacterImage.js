import { bool, string } from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCloudUploadAlt, FaUserCircle } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import styled from 'styled-components';

import { useCloudinary, useFirebase, useMessage, usePlayer } from '../../../../../../../hooks';
import { Button, ButtonRow } from '../../../../../../ui';

const AddPrompt = styled.div(({ theme }) => {
  const { color, space } = theme;

  return `
    display: grid;
    align-items: center;
    justify-content: center;
    border: 3px dashed ${color.darkgray};
    padding: ${space.lg};
    cursor: pointer;
    color: ${color.darkgray};
    font-size: 2rem;

    &:hover {
      border-color: ${color.white};
      color: ${color.white};
    }
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

const CharacterImage = ({ imageKey, canEdit }) => {
  const { cloudinaryUrlGen, createUploadWidget } = useCloudinary();
  const { characterId } = useParams();
  const [player] = usePlayer();
  const [uploadWidget, setUploadWidget] = useState();
  const [message, setMessage] = useMessage();
  const { updateDocument } = useFirebase();

  useEffect(() => {
    if (!uploadWidget) {
      const handleUploadSuccess = async (result) => {
        try {
          await updateDocument('characters', characterId, {
            imagePublicId: result.public_id,
          });
        }
        catch (err) {
          setMessage('error', err.message);
        }
      };

      const widget = createUploadWidget({
        uploadPreset: 'characters',
        multiple: false,
        context: {
          character: characterId,
          player: player.id,
        }
      }, handleUploadSuccess);
      setUploadWidget(widget);
    }
  }, [uploadWidget, characterId, createUploadWidget, player, setMessage, updateDocument]);
  
  const handleWidgetOpen = () => {
    uploadWidget.open();
  };

  if (!imageKey) {
    return (
      <>
        {message}
        {canEdit
          ? (
            <AddPrompt onClick={handleWidgetOpen}>
              <AiOutlinePlusCircle />
            </AddPrompt>
            )
          : (
            <ImagePlaceholder>
              <FaUserCircle />
            </ImagePlaceholder>
          )}
      </>
    );
  }

  const charImg = cloudinaryUrlGen.image(imageKey);
  charImg.resize(thumbnail().width(150).height(150));
  
  return (
    <>
      <AdvancedImage cldImg={charImg} />
      <ButtonRow compact>
        <Button
          tiny
          inverted
          icon={<FaCloudUploadAlt />}
          label="Update"
          onClick={handleWidgetOpen}
        />
      </ButtonRow>
    </>
  );
};
CharacterImage.propTypes = {
  imageKey: string,
  canEdit: bool,
};
CharacterImage.defaultProps = {
  canEdit: false,
};

export default CharacterImage;
