import React from "react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Page } from "../ui";
import CategorySelector from "./CategorySelector";
import RecordSelector from "./RecordSelector";
import RecordViewer from "./RecordViewer";

const InfoHome = () => {
  const { categoryId, recordId } = useParams();

  return (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Info", target: "/info" }
        ]}
      />
      <CategorySelector />
      {categoryId && <RecordSelector />}
      {recordId && <RecordViewer />}
    </Page>
  );
};

export default InfoHome;
