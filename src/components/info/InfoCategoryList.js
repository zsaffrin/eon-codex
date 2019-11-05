import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

const StyledList = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    columns: 4;
    column-gap: ${space.sm};
  `;
});
const StyledItem = styled(Link)(({ theme }) => {
  const { space } = theme;
  return `
    break-inside: avoid; 
    display: grid;
    padding: ${space.sm};
  `;
});

const InfoCategoryList = ({ collection, items }) => {
  const { url } = useRouteMatch();
  return (
    <StyledList>
      {items.map(({ id, name }) => (
        <StyledItem to={`${url}/${collection}/${id}`}>{name}</StyledItem>
      ))}
    </StyledList>
  );
};

export default InfoCategoryList;
