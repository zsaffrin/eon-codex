import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

import { useCollection } from "../../hooks/firestoreHooks";
import { sortBy } from "../../utils/dataUtils";
import { Loading } from "../ui";

const RecordChoiceWrap = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.secondary};
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  `;
});
const RecordChoice = styled(Link)(({ theme }) => {
  const { color, space } = theme;
  return `
    border-radius: inherit;
    color: ${color.background};
    display: grid;
    align-items: center;
    padding: ${space.sm};
    text-align: center;
    text-decoration: none;

    &:hover {
      background: ${tinycolor(color.secondary).darken(10)}
    }
  `;
});

const RecordSelector = () => {
  const { categoryId } = useParams();
  const [collection, collectionLoading] = useCollection(categoryId || " ");

  return (
    <RecordChoiceWrap>
      {collectionLoading ? (
        <Loading />
      ) : (
        sortBy(collection, "name").map(({ id, name }) => (
          <RecordChoice to={`/info/${categoryId}/${id}`}>{name}</RecordChoice>
        ))
      )}
    </RecordChoiceWrap>
  );
};

export default RecordSelector;
