import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const CategoryChoiceWrap = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.primary};
    border: 1px solid ${color.primary};
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  `;
});
const CategoryChoice = styled(Link)(({ selected, theme }) => {
  const { color, space } = theme;
  return `
    background: ${selected && tinycolor(color.primary).lighten(50)}
    color: ${selected ? color.primary : color.background};
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

const categories = [
  { key: "groups", label: "Groups" },
  { key: "people", label: "People" },
  { key: "places", label: "Places" },
  { key: "playerCharacters", label: "PCs" }
];

const CategorySelector = () => {
  const { categoryId } = useParams();
  return (
    <CategoryChoiceWrap>
      {categories.map(({ key, label }) => (
        <CategoryChoice
          selected={categoryId === key}
          to={`/info/${key}`}
          key={key}
        >
          {label}
        </CategoryChoice>
      ))}
    </CategoryChoiceWrap>
  );
};

export default CategorySelector;
