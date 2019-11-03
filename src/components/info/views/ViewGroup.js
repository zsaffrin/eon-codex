import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Breadcrumb, Loading, Page } from "../../ui";

const ViewGroup = () => {
  const { recordId } = useParams();
  const [record, recordLoading, recordError] = useDocument(
    `groups/${recordId}`
  );

  return recordLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Info", target: "/info" },
          { label: "Groups", target: "/info/groups" }
        ]}
      />
      <h1>{record.name}</h1>
      <div>{record.shortDesc}</div>
      <ReactMarkdown source={record.desc} />
    </Page>
  );
};

export default ViewGroup;
