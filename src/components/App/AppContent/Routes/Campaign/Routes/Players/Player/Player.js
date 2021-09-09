import { AiFillHome } from 'react-icons/ai';

import { useCampaign } from '../../../../../../../../hooks';
import { Breadcrumb, H, Link, Page } from '../../../../../../../ui';

const Player = ({ player }) => {
  const { key: campaignKey } = useCampaign();
  const { name } = player;

  return (
    <Page>
      <div>
        <Breadcrumb items={[
          <Link to={`/campaign/${campaignKey}`}>
            <AiFillHome />
          </Link>,
          <Link to={`/campaign/${campaignKey}/players`}>
            Players
          </Link>,
        ]} />
        <H l={1} compact>{name}</H>
      </div>
    </Page>
  );
};

export default Player;
