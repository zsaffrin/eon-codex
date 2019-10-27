import React from "react";
import { useParams } from "react-router-dom";

import { useDocument } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const ViewRecord = () => {
  const { collectionName, recordId } = useParams();
  const [record, recordLoading, recordError] = useDocument(
    `${collectionName}/${recordId}`
  );

  return recordLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>{record.name}</h1>
      <div>{record.shortDesc}</div>
    </div>
  );
};

export default ViewRecord;
