import React from "react";
import { arrayOf, func, shape, string } from "prop-types";

import { sortBy } from "../../../utils/dataUtils";

const SelectInput = ({ id, value, onChange, choices }) => {
  const sortedChoices = sortBy(choices, "name");

  return (
    <select id={id} value={value} onChange={onChange}>
      <option value=""></option>
      {sortedChoices.map(choice => (
        <option value={choice.id} key={choice.id}>
          {choice.name}
        </option>
      ))}
    </select>
  );
};
SelectInput.propTypes = {
  id: string,
  value: string,
  onChange: func,
  choices: arrayOf(shape({}))
};
SelectInput.defaultProps = {
  id: "",
  value: "",
  onChange: () => {},
  choices: []
};

export default SelectInput;
