import React from "react";
import { Link as RRLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(RRLink)(({ blended, theme }) => {
  const { color, text } = theme;
  return `
    color: ${blended ? "inherit" : text.linkColor};
    text-decoration: none;

    &:hover {
      color: ${blended ? color.highlight : text.linkHoverColor};
      text-decoration: ${blended ? "inherit" : "underline"}
    }
  `;
});

const Link = ({ external, blended, children, ...props }) => {
  return (
    <StyledLink
      as={external && "a"}
      blended={blended ? 1 : 0}
      href={external && props.to}
      target={external && "_blank"}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
