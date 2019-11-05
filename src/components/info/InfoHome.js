import React from "react";
import styled from "styled-components";

import { Breadcrumb, Page } from "../ui";
import InfoCategory from "./InfoCategory";
import CategorySelector from "./CategorySelector";
import RecordSelector from "./RecordSelector";
import RecordViewer from "./RecordViewer";

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
      <Breadcrumb links={[{ label: "Home", target: "/" }, { label: "Info", target: "/info" }]} />

      <CategorySelector />
      <RecordSelector />
      <RecordViewer />

      {/* <CategoryList>
        <InfoCategory title="Places" collectionName="places" />
        <InfoCategory title="People" collectionName="people" />
        <InfoCategory title="Groups and Guilds" collectionName="groups" />
        <InfoCategory title="PCs" collectionName="playerCharacters" />
      </CategoryList> */}
    </Page>
  );
};

export default InfoHome;
