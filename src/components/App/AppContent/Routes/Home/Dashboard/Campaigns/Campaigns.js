import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

import { useCollection, useToggledModal, useUser } from '../../../../../../../hooks';
import { Button, HeaderRow, Loading } from '../../../../../../ui';

import AddCampaign from './AddCampaign';

const CampaignLink = styled(Link)(({ theme }) => {
  const { links, space } = theme;

  return `
    color: inherit;
    padding: ${space.sm};
    text-decoration: none;

    &:hover {
      background: ${links.backgroundHover};
    }
  `;
});

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
  
  return (
    <>
      {addModal}
      <HeaderRow
        title="Campaigns"
        content={(
          <Button small icon={<FaPlus />} label="New Campaign" onClick={toggleAddModal} />
        )}
      />
      {userCampaigns.map(({ key, id, name }) => (
        <CampaignLink key={id} to={`/campaign/${key}`}>{name}</CampaignLink>
      ))}
    </>
  );
};
Campaigns.propTypes = {};
Campaigns.defaultProps = {};

export default Campaigns;
