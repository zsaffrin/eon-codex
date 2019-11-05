import React from "react";
import styled from "styled-components";

import { Breadcrumb, Page } from "../ui";
import CategorySelector from "./CategorySelector";
import RecordSelector from "./RecordSelector";
import RecordViewer from "./RecordViewer";

const InfoHome = () => {
  return (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Info", target: "/info" }
        ]}
      />
      <CategorySelector />
      <RecordSelector />
      <RecordViewer />
    </Page>
  );
};

export default InfoHome;
