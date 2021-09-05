import { AiFillHome } from 'react-icons/ai';

import { useCampaign, useToggle } from '../../../../../../../../hooks';
import { Box, Breadcrumb, ButtonRow, Button, H, Link, Modal, Page, TitleRow } from '../../../../../../../ui';
import EditCharacter from '../EditCharacter';

const Character = ({ character }) => {
  const { key: campaignKey } = useCampaign();
  const [isEditing, setIsEditing] = useToggle();
  const { name } = character;
  
  return (
    <Page>
      {isEditing && (
        <Modal>
          <EditCharacter close={setIsEditing} character={character} />
        </Modal>
      )}
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to={`/campaign/${campaignKey}`}>
              <AiFillHome />
            </Link>,
            <Link to={`/campaign/${campaignKey}/characters`}>
              Characters
            </Link>,
          ]} />
          <H l={1} compact>{name}</H>
        </div>
        <ButtonRow>
          <Button onClick={setIsEditing}>Edit</Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        <H l={2} compact>Info</H>
        Stuff and whatnot
      </Box>
      <Box>
        <H l={2} compact>Backstory</H>
        Ways and means
      </Box>
    </Page>
  );
};

export default Character;
