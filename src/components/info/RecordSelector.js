import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

import { useCollection } from "../../hooks/firestoreHooks";
import { sortBy } from "../../utils/dataUtils";
import { Loading } from "../ui";

const RecordChoiceWrap = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    background: ${color.secondary};
    border: 1px solid ${color.secondary};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;
});
const RecordChoice = styled(Link)(({ selected, theme }) => {
  const { color, space } = theme;

  return `
    background: ${selected && tinycolor(color.secondary).lighten(60)}
    border-radius: inherit;
    color: ${selected ? color.secondary : color.background};
    display: grid;
    align-items: center;
    padding: ${space.sm} ${space.lg};
    text-align: center;
    text-decoration: none;

    &:hover {
      background: ${
        selected
          ? tinycolor(color.secondary).lighten(50)
          : tinycolor(color.secondary).darken(10)
      }
    }
  `;
});

const RecordSelector = () => {
  const { categoryId, recordId } = useParams();
  const [collection, collectionLoading] = useCollection(categoryId || " ");

  return (
    <RecordChoiceWrap>
      {collectionLoading ? (
        <Loading />
      ) : (
        sortBy(collection, "name").map(({ id, name }) => (
          <RecordChoice
            selected={recordId === id}
            to={`/info/${categoryId}/${id}`}
            key={id}
          >
            {name}
          </RecordChoice>
        ))
      )}
    </RecordChoiceWrap>
  );
};

export default RecordSelector;
