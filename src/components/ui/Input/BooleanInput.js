import React from 'react';
import { bool, func, string } from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const BooleanInput = ({ id, value, onChange }) => (
  <StyledLabel htmlFor={id}>
    <input
      type="checkbox"
      checked={value}
      id={id}
      onChange={(e) => onChange({
        id,
        value: e.target.checked,
      })}
    />
  </StyledLabel>
);
BooleanInput.propTypes = {
  id: string,
  value: bool,
  onChange: func,
};
BooleanInput.defaultProps = {
  id: '',
  value: false,
  onChange: () => {},
};

export default BooleanInput;
