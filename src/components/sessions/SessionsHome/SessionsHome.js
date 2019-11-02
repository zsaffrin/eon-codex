import React from "react";

import { useCollection } from "../../../hooks/firestoreHooks";
import { Breadcrumb, Loading, Page } from "../../ui";
import PlayedSessions from "./PlayedSessions";
import PlannedSessions from "./PlannedSessions";

const SessionsHome = () => {
  const [collection, collectionLoading] = useCollection("sessions");

  const sessions =
    collection &&
    collection.reduce(
      (acc, session) => {
        if (!acc[session.status]) {
          acc[session.status] = [];
        }
        acc[session.status].push(session);

        return acc;
      },
      { upcoming: [], past: [] }
    );

  return collectionLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb links={[{ label: "Home", target: "/" }]} />
      <h1>Sessions</h1>
      <PlannedSessions sessions={sessions.planned} />
      <PlayedSessions sessions={sessions.played} />
    </Page>
  );
};

export default SessionsHome;
