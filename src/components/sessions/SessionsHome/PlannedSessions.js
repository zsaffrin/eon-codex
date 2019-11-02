import React from "react";

import SessionList from "./SessionList";

const PlannedSessions = ({ sessions }) => {
  return (
    <div>
      <h2>Planned Sessions</h2>
      <SessionList sessions={sessions} />
    </div>
  );
};

export default PlannedSessions;
