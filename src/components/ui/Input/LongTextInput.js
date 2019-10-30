import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea(({ theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.accent};
    border-radius: 0.25em;
    padding: 0.5em;
    font-size: 0.9em;
    width: 100%;
    min-height: 20em;
  `;
});

const LongTextInput = ({ id, value, onChange }) => {
  return <StyledTextarea id={id} name={id} value={value} onChange={onChange} />;
};

export default LongTextInput;
