import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)(({ theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${color.lightgray};
    border-radius: ${space.sm};
    color: inherit;
    display: block;
    padding: ${space.md};
    text-decoration: none;

    &:hover {
      border-color: ${color.primary};
    }
  `;
});
const LinkTileTitle = styled.h3`
  margin: 0;
`;

const LinkTile = ({ children, title, to }) => {
  return (
    <StyledLink to={to}>
      <LinkTileTitle>{title}</LinkTileTitle>
      <>{children}</>
    </StyledLink>
  );
};

export default LinkTile;
