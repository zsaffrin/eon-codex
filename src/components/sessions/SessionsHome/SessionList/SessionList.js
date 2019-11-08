import React from "react";
import { string } from "prop-types";
import styled from "styled-components";

import { sortBy } from "../../../../utils/dataUtils";
import SessionListItem from "./SessionListItem";

const StyledList = styled.div(({ compact, theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${compact ? space.thin : space.md}
  `;
});

const SessionList = ({ compact, mainColor, sessions }) => {
  return (
    <StyledList compact={compact ? 1 : 0}>
      {sortBy(sessions, "date", "desc").map(session => (
        <SessionListItem
          compact={compact ? 1 : 0}
          key={session.id}
          session={session}
          mainColor={mainColor}
        />
      ))}
    </StyledList>
  );
};
SessionList.propTypes = { mainColor: string };
SessionList.defaultProps = { mainColor: "#666" };

export default SessionList;
