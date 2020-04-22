import React from 'react';
import {
  arrayOf, func, shape, string,
} from 'prop-types';

const SelectInput = ({
  id, value, onChange, choices,
}) => (
  <select id={id} value={value} onChange={(e) => onChange({ id, value: e.target.value })}>
    <option value={null}> </option>
    {choices.map(({ itemValue, label }) => (
      <option value={itemValue} key={itemValue}>
        {label}
      </option>
    ))}
  </select>
);
SelectInput.propTypes = {
  id: string,
  value: string,
  onChange: func,
  choices: arrayOf(shape({})),
};
SelectInput.defaultProps = {
  id: null,
  value: '',
  onChange: () => {},
  choices: [],
};

export default SelectInput;
