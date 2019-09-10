import React from "react";
import { arrayOf, func, shape, string } from "prop-types";

const SelectInput = ({ id, value, onChange, choices }) => {
  return (
    <select id={id} value={value} onChange={onChange}>
      <option value=""></option>
      {choices.map(choice => (
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
