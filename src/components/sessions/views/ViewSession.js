import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Breadcrumb, Loading, Lookup, Page } from "../../ui";
import { formatDate } from "../../../utils/dateUtils";

const ViewSession = () => {
  const { sessionId } = useParams();
  const [session, sessionLoading, sessionError] = useDocument(
    `sessions/${sessionId}`
  );

  return sessionLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Sessions", target: "/sessions" }
        ]}
      />

      <h1>Session</h1>
      <div>Date Played: {formatDate(session.date.toDate())}</div>
      <div>
        Played at:{" "}
        <Lookup collection="gamingLocations" recordId={session.location} />
      </div>
      <div>
        <h2>Recap</h2>
        <ReactMarkdown source={session.recap} />
      </div>
    </Page>
  );
};

export default ViewSession;
