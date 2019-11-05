import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const RecordChoiceWrap = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-flow: column;
  `;
});
const RecordChoice = styled(Link)(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.sm};
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
        collection.map(({ id, name }) => (
          <RecordChoice to={`/info/${categoryId}/${id}`}>{name}</RecordChoice>
        ))
      )}
    </RecordChoiceWrap>
  );
};

export default RecordSelector;
