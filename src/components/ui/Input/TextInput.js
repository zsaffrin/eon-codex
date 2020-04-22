import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input(({ theme }) => {
  const { inputs } = theme;
  return `
    border: 1px solid ${inputs.borderColor};
    border-radius: 0.25em;
    padding: 0.5em;
    font-size: 0.9em;
    width: 100%;
    max-width: 18em;
  `;
});

const TextInput = ({ id, value, onChange }) => (
  <StyledInput
    type="text"
    id={id}
    value={value}
    onChange={(e) => onChange({
      id,
      value: e.target.value,
    })}
  />
);
TextInput.propTypes = {
  id: string,
  value: string,
  onChange: func,
};
TextInput.defaultProps = {
  id: '',
  value: '',
  onChange: () => {},
};

export default TextInput;
