import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Breadcrumb, Loading, Page } from "../../ui";

const ViewPerson = () => {
  const { recordId } = useParams();
  const [record, recordLoading, recordError] = useDocument(
    `places/${recordId}`
  );

  return recordLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Info", target: "/info" },
          { label: "People", target: "/info/people" }
        ]}
      />
      <h1>{record.name}</h1>
      <ReactMarkdown source={record.desc} />
    </Page>
  );
};

export default ViewPerson;
