import React from "react";
import styled from "styled-components";

import { useCollection } from "../../hooks/firestoreHooks";
import { sortBy } from "../../utils/dataUtils";
import { Loading } from "../ui";
import InfoCategoryList from "./InfoCategoryList";

const Category = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${color.primary};
    border-radius: ${space.sm};
  `;
});
const CategoryHeader = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    padding: ${space.sm};
    color: ${color.background};
    background: ${color.primary};
  `;
});
const CategoryTitle = styled.h3`
  margin: 0;
`;

const InfoCategory = ({ title, collectionName }) => {
  const [collection, collectionLoading] = useCollection(collectionName);

  return (
    <Category>
      <CategoryHeader>
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryHeader>
      {collectionLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <InfoCategoryList
          collection={collectionName}
          items={sortBy(collection, "name")}
        />
      )}
    </Category>
  );
};

export default InfoCategory;
