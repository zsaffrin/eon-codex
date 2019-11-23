import React from "react";
import { useParams } from "react-router-dom";

import { useDocument } from "../../hooks/firestoreHooks";
import { Loading, Page } from "../ui";
import { ViewGroup, ViewPerson, ViewPlace, ViewPlayerCharacter } from "./views";

const RecordViewer = () => {
  const { categoryId, recordId } = useParams();
  const [record, recordLoading] = useDocument(`${categoryId}/${recordId}`);

  if (recordLoading) {
    return <Loading />;
  }
  if (categoryId === "groups") {
    return <ViewGroup record={record} />;
  }
  if (categoryId === "people") {
    return <ViewPerson record={record} />;
  }
  if (categoryId === "places") {
    return <ViewPlace record={record} />;
  }
  if (categoryId === "playerCharacters") {
    return <ViewPlayerCharacter record={record} />;
  }
  return (
    <Page>
      {categoryId && "Something's wrong - no view for this category configured"}
    </Page>
  );
};

export default RecordViewer;
