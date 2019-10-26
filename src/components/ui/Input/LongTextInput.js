import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 30em;
  height: 10em;
`;

const LongTextInput = ({ id, value, onChange }) => {
  return <StyledTextarea id={id} name={id} value={value} onChange={onChange} />;
};

export default LongTextInput;
