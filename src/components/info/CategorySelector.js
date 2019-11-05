import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const CategoryChoiceWrap = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.primary};
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  `;
});
const CategoryChoice = styled(Link)(({ theme }) => {
  const { color, space } = theme;
  return `
    color: ${tinycolor(color.primary).isLight() ? color.black : color.white};
    font-weight: bold;
    padding: ${space.md};
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      background: ${tinycolor(color.primary).darken(10)}
    }
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
