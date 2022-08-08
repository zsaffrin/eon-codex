import { useCollection } from "../../../hooks";
import MultiselectInputChoices from './MultiselectInputChoices';

import Loading from '../Loading';

const MultiselectInput = ({ id, lookup, lookupFilterKey, lookupFilterValue, onChange, value }) => {
  const [collection, collectionLoading] = useCollection(lookup);

  if (collectionLoading) {
    return <Loading />;
  }

  const choices = lookupFilterKey
    ? collection.filter((item) => item[lookupFilterKey] === lookupFilterValue)
    : collection;

  const toggleSelection = (selectionId) => {
    const alreadySelected = value.includes(selectionId);

    let newValue;
    if (alreadySelected) {
      newValue = value.reduce((acc, i) => (
        i === selectionId ? acc : [ ...acc, i ]
      ), []);
    } else {
      newValue = [ ...value, selectionId ];
    }

    onChange({ id, value: newValue });
  };
  
  return (
    <MultiselectInputChoices
      choices={choices}
      selections={value}
      toggleSelection={toggleSelection}
    />
  );
};
MultiselectInput.propTypes = {

};
MultiselectInput.defaultProps = {};

export default MultiselectInput;
