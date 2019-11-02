import React from "react";

import { sortBy } from "../../../utils/dataUtils";
import SessionList from "./SessionList";

const PlayedSessions = ({ sessions }) => {
  return (
    <div>
      <h2>Played Sessions</h2>
      <SessionList sessions={sortBy(sessions, "date", "desc")} compact />
    </div>
  );
};

export default PlayedSessions;
