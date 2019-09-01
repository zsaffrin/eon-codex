import React from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const Sessions = () => {
  const [sessions, sessionsLoading, sessionsError] = useCollection("sessions");

  return (
    <div>
      <h1>Sessions</h1>
      {sessionsLoading ? (
        <Loading />
      ) : sessions ? (
        sessions.map(({ id, location, startDate }) => (
          <div key={id}>
            <div>{location}</div>
            <div>{startDate.toDate().toLocaleString("en-US")}</div>
          </div>
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default Sessions;
