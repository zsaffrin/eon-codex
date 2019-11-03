import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { sortBy } from "../../../utils/dataUtils";
import SessionList from "./SessionList";

const PlayedSessions = ({ sessions }) => {
  const { color } = useContext(ThemeContext);

  return (
    <div>
      <h2>Played Sessions</h2>
      <SessionList
        mainColor={color.secondary}
        sessions={sortBy(sessions, "date", "desc")}
        compact
      />
    </div>
  );
};

export default PlayedSessions;
