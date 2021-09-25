import { AiFillHome } from 'react-icons/ai';

import { useCampaign, useToggle } from '../../../../../../../../hooks';
import { Breadcrumb, Button, ButtonRow, H, Link, Modal, Page, TitleRow } from '../../../../../../../ui';
import EditPlayer from '../EditPlayer';

const Player = ({ player }) => {
  const [isEditing, setIsEditing] = useToggle();
  const { key: campaignKey } = useCampaign();
  const { name } = player;

  return (
    <Page>
      {isEditing && (
        <Modal>
          <EditPlayer close={setIsEditing} player={player} />
        </Modal>
      )}
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to={`/campaign/${campaignKey}`}>
              <AiFillHome />
            </Link>,
            'Players',
          ]} />
          <H l={1} compact>{name}</H>
        </div>
        <ButtonRow>
          <Button onClick={setIsEditing}>Edit</Button>
        </ButtonRow>
      </TitleRow>
    </Page>
  );
};

export default Player;
