import React from 'react';
import { func, number, string } from 'prop-types';

const NumberInput = ({ id, value, onChange }) => (
  <input
    type="number"
    id={id}
    value={value}
    onChange={(e) => onChange({
      id,
      value: Number(e.target.value),
    })}
  />
);
NumberInput.propTypes = {
  id: string,
  value: number,
  onChange: func,
};
NumberInput.defaultProps = {
  id: null,
  value: 0,
  onChange: () => {},
};

export default NumberInput;
