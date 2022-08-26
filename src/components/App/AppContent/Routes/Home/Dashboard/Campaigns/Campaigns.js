import { FaPlus } from 'react-icons/fa';

import { useCollection, useToggledModal, useUser } from '../../../../../../../hooks';
import { Button, H, HeaderRow, ItemList, Loading } from '../../../../../../ui';

import AddCampaign from './AddCampaign';

const Campaigns = () => {
  const [user] = useUser();
  const [players, isPlayersLoading] = useCollection('players', ["user","==",user.id]);
  const [campaigns, isCampaignsLoading] = useCollection('campaigns');
  const [addModal, toggleAddModal] = useToggledModal(AddCampaign, {
    campaignKeys: isCampaignsLoading ? [] : [...new Set(campaigns.map(({ key }) => key))],
  });

  if (isPlayersLoading || isCampaignsLoading) {
    return <Loading />;
  }

  const userCampaigns = players.map(({ campaign }) => (
    campaigns.find(c => c.id === campaign)
  ));

  const listItems = userCampaigns.map(({ key, name }) => ({
    key,
    content: (
      <H l={3} compact>
        {name}
      </H>
    ),
    to: `/campaign/${key}`,
  }));
  
  return (
    <>
      {addModal}
      <HeaderRow
        title="Campaigns"
        content={(
          <Button small icon={<FaPlus />} label="New Campaign" onClick={toggleAddModal} />
        )}
      />
      <ItemList isLinks items={listItems} />
    </>
  );
};
Campaigns.propTypes = {};
Campaigns.defaultProps = {};

export default Campaigns;
