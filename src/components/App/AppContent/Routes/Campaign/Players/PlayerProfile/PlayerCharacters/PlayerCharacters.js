import { arrayOf, shape } from "prop-types";

import { useCampaign } from "../../../../../../../../hooks";
import { H, HeaderRow, ItemList } from '../../../../../../../ui';

const PlayerCharacters = ({ characters }) => {
  const { key: campaignKey } = useCampaign();
  
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
  
  return (
    <>
      <HeaderRow title="Characters" />
      <ItemList isLinks items={listItems} />
    </>
  );
};
PlayerCharacters.propTypes = {
  characters: arrayOf(shape({})),
};
PlayerCharacters.defaultProps = {
  characters: [],
};

export default PlayerCharacters;
