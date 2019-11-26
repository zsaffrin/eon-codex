import React from "react";
import styled from "styled-components";

const Row = styled.div(({ items, theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: repeat(${items}, auto) 1fr;
    grid-gap: ${space.sm};
    padding: ${space.md} 0;
  `;
});

const ButtonRow = ({ children }) => {
  return <Row items={children.length}>{children}</Row>;
};

export default ButtonRow;
