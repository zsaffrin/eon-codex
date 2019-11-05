import React from "react";
import styled from "styled-components";

import { Page } from "../ui";
import InfoCategory from "./InfoCategory";

const CategoryList = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
  `;
});

const InfoHome = () => {
  return (
    <Page>
      <h1>Info</h1>
      <CategoryList>
        <InfoCategory title="Places" collectionName="places" />
        <InfoCategory title="People" collectionName="people" />
        <InfoCategory title="Groups and Guilds" collectionName="groups" />
        <InfoCategory title="PCs" collectionName="playerCharacters" />
      </CategoryList>
    </Page>
  );
};

export default InfoHome;
