import React from "react";

import { sortBy } from "../../../utils/dataUtils";
import SessionList from "./SessionList";

const PlannedSessions = ({ sessions }) => {
  return (
    <div>
      <h2>Planned Sessions</h2>
      <SessionList sessions={sortBy(sessions, "date")} />
    </div>
  );
};

export default PlannedSessions;
