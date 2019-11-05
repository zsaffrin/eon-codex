import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const CategoryChoiceWrap = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-flow: column;
  `;
});
const CategoryChoice = styled(Link)(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.sm};
  `;
});

const CategorySelector = () => {
  const { categoryId, recordId } = useParams();
  return (
    <CategoryChoiceWrap>
      <CategoryChoice to="/info/places">Places</CategoryChoice>
      <CategoryChoice to="/info/people">People</CategoryChoice>
      <CategoryChoice to="/info/groups">Groups</CategoryChoice>
      <CategoryChoice to="/info/playerCharacters">PCs</CategoryChoice>
    </CategoryChoiceWrap>
  );
};

export default CategorySelector;
