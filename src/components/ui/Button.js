import React from "react";
import styled from "styled-components";

const StyledButton = styled.button(({ theme }) => {
  const { color } = theme;
  return `
    -webkit-appearance: none;
    border-radius: 0.25em;
    background: ${color.primary};
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    padding: 0.5em 1em;

    &:hover {
      background: ${color.primaryLight};
    }
  `;
});

const Button = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
