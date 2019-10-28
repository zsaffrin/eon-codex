import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Loading, Page } from "../../ui";
import { formatDate } from "../../../utils/dateUtils";

const ViewSession = () => {
  const { sessionId } = useParams();
  const [session, sessionLoading, sessionError] = useDocument(
    `sessions/${sessionId}`
  );
  const [location, locationLoading, locationError] = useDocument(
    `gamingLocations/${sessionLoading ? " " : session.location}`
  );

  return sessionLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>Session</h1>
      <div>Date Played: {formatDate(session.date.toDate())}</div>
      <div>Played at: {locationLoading ? <Loading /> : location.name}</div>
      <div>
        <h2>Recap</h2>
        <ReactMarkdown source={session.recap} />
      </div>
    </Page>
  );
};

export default ViewSession;
