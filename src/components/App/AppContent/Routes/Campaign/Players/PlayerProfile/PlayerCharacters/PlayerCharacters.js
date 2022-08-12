import { arrayOf, shape, string } from "prop-types";
import { FaPlus } from 'react-icons/fa';

import { useCampaign, useToggledModal, useUser } from "../../../../../../../../hooks";
import { Button, H, HeaderRow, ItemList } from '../../../../../../../ui';
import { AddCharacter } from '../../../Characters';

const PlayerCharacters = ({ characters, player }) => {
  const { key: campaignKey } = useCampaign();
  const [user] = useUser();
  const [addModal, toggleAddModal] = useToggledModal(AddCharacter);
  
  const listItems = characters.map(({ id, name, classDesc }) => ({
    key: id,
    content: (
      <>
        <H l={3} compact>{name}</H>
        <div>{classDesc}</div>
      </>
    ),
    to: `/campaign/${campaignKey}/character/${id}`,
  }));

  const rightContent = player.user === user.id
    ? (
        <Button
          small
          icon={<FaPlus />}
          label="New Character"
          onClick={toggleAddModal}
        />
      )
    : null;
  
  return (
    <>
      {addModal}
      <HeaderRow
        title="Characters"
        content={rightContent}
      />
      <ItemList isLinks items={listItems} />
    </>
  );
};
PlayerCharacters.propTypes = {
  characters: arrayOf(shape({})),
  player: shape({
    user: string,
  }),
};
PlayerCharacters.defaultProps = {
  characters: [],
  player: {},
};

export default PlayerCharacters;
