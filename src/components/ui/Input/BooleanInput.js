import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const BooleanInput = ({ id, value, onChange }) => {
  return (
    <StyledLabel htmlFor={id}>
      <input type="checkbox" checked={value} id={id} onChange={onChange} />
    </StyledLabel>
  );
};

export default BooleanInput;
