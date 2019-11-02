import React from "react";
import styled from "styled-components";

import SessionListItem from "./SessionListItem";

const StyledList = styled.div(({ compact, theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${compact ? space.thin : space.md}
  `;
});

const SessionList = ({ compact, sessions }) => {
  return (
    <StyledList compact={compact ? 1 : 0}>
      {sessions.map(session => (
        <SessionListItem
          compact={compact ? 1 : 0}
          key={session.id}
          session={session}
        />
      ))}
    </StyledList>
  );
};

export default SessionList;
