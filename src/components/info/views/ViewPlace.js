import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Loading, Page } from "../../ui";

const ViewPlace = () => {
  const { recordId } = useParams();
  const [record, recordLoading, recordError] = useDocument(
    `places/${recordId}`
  );

  return recordLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>{record.name}</h1>
      <div>{record.shortDesc}</div>
      <ReactMarkdown source={record.longDesc} />
    </Page>
  );
};

export default ViewPlace;
