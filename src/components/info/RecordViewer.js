import React from "react";
import { useParams } from "react-router-dom";

import { useDocument } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const RecordViewer = () => {
  const { categoryId, recordId } = useParams();
  const [record, recordLoading, recordError] = useDocument(
    `${categoryId}/${recordId}`
  );

  return recordLoading ? <Loading /> : <div>{record.name}</div>;
};

export default RecordViewer;
