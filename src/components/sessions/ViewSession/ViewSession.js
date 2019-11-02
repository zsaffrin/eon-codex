import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Breadcrumb, Loading, Lookup, Page } from "../../ui";
import { formatDate } from "../../../utils/dateUtils";
import ViewPlannedSession from "./ViewPlannedSession";
import ViewPlayedSession from "./ViewPlayedSession";

const ViewSession = () => {
  const { sessionId } = useParams();
  const [session, sessionLoading, sessionError] = useDocument(
    `sessions/${sessionId}`
  );

  if (sessionLoading) {
    return <Loading />;
  }

  if (session.status === "planned") {
    return <ViewPlannedSession session={session} />;
  }
  if (session.status === "played") {
    return <ViewPlayedSession session={session} />;
  }

  return <div>No view configured for session status "{session.status}"</div>;
};

export default ViewSession;
