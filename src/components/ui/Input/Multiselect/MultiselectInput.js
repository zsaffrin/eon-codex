import React, { useState, useEffect } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import styled from "styled-components";

import MultiselectInputChoice from "./MultiselectInputChoice";

const StyledChoices = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${space.thin};
  `;
});

const MultiselectInput = ({ id, value, choices, onChange }) => {
  const [selections, setSelections] = useState(value);

  useEffect(() => {
    if (Object.keys(selections).length !== Object.keys(value).length) {
      onChange({ isMultiselect: true, fieldId: id, value: selections });
    }
  }, [selections, value]);

  const removeKey = (obj, keyToRemove) => {
    const newObj = Object.keys(obj).reduce(
      (acc, key) =>
        key === keyToRemove ? { ...acc } : { ...acc, [key]: obj[key] },
      {}
    );
    return newObj;
  };

  const handleSelectionChange = selectionToggled => {
    if (selections[selectionToggled]) {
      setSelections(removeKey(selections, selectionToggled));
    } else {
      setSelections({
        ...selections,
        [selectionToggled]: true
      });
    }
  };

  const choiceItems = choices.map(choice => (
    <MultiselectInputChoice
      selected={selections[choice.id]}
      choice={choice}
      key={choice.id}
      onChange={handleSelectionChange}
    />
  ));

  return <StyledChoices>{choiceItems}</StyledChoices>;
};
MultiselectInput.propTypes = {
  id: string,
  value: shape({}),
  onChange: func,
  choices: arrayOf(shape({}))
};
MultiselectInput.defaultProps = {
  id: "",
  value: {},
  onChange: () => {},
  choices: []
};

export default MultiselectInput;
