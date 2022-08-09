import { FaPlus } from 'react-icons/fa';

import { useCampaign, useToggledModal } from '../../../../../../hooks';
import { Box, Button, H, ItemList, Page, PageHeader } from '../../../../../ui';
import AddCharacter from './AddCharacter';

const Characters = () => {
  const { key: campaignKey, characters } = useCampaign();
  const [addModal, toggleAddModal] = useToggledModal(AddCharacter);

  const listItems = characters.map(({ id, name, playerName }) => ({
    key: id,
    content: (
      <>
        <H l={3} compact>{name}</H>
        <div>{`Played by ${playerName}`}</div>
      </>
    ),
    to: `/campaign/${campaignKey}/character/${id}`,
  }));
  
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
