import React, { useState, useEffect } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import styled from "styled-components";

import MultiselectInputChoice from "./MultiselectInputChoice";

const StyledChoices = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const MultiselectInput = ({ id, value, choices, onChange }) => {
  const [selections, setSelections] = useState(value);

  useEffect(() => {
    if (selections !== value) {
      onChange({ isMultiselect: true, fieldId: id, value: selections });
    }
  }, [selections]);

  const handleSelectionChange = selectionToggled => {
    setSelections({
      ...selections,
      [selectionToggled]: !selections[selectionToggled]
    });
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
