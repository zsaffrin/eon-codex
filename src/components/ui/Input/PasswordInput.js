import React from 'react';
import { func, string } from 'prop-types';
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

const PasswordInput = ({ id, value, onChange }) => (
  <StyledInput
    type="password"
    id={id}
    value={value}
    onChange={(e) => onChange({
      id,
      value: e.target.value,
    })}
  />
);
PasswordInput.propTypes = {
  id: string,
  value: string,
  onChange: func,
};
PasswordInput.defaultProps = {
  id: null,
  value: null,
  onChange: () => {},
};

export default PasswordInput;
