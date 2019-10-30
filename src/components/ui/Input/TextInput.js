import React from "react";
import styled from "styled-components";

const StyledInput = styled.input(({ theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.accent};
    border-radius: 0.25em;
    padding: 0.5em;
    font-size: 0.9em;
    width: 100%;
    max-width: 18em;
  `;
});

const TextInput = ({ id, value, onChange }) => {
  return <StyledInput type="text" id={id} value={value} onChange={onChange} />;
};

export default TextInput;
