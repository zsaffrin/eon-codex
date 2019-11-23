import React from "react";
import { useParams } from "react-router-dom";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Loading } from "../../ui";
import ViewPlannedSession from "./ViewPlannedSession";
import ViewPlayedSession from "./ViewPlayedSession";

const ViewSession = () => {
  const { sessionId } = useParams();
  const [session, sessionLoading] = useDocument(`sessions/${sessionId}`);

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
