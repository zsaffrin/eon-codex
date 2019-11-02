import React from "react";
import styled from "styled-components";

import SessionListItem from "./SessionListItem";

const StyledList = styled.div(({ compact, theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${compact ? space.sm : space.md}
  `;
});

const SessionList = ({ compact, sessions }) => {
  return (
    <StyledList>
      {sessions.map(session => (
        <SessionListItem compact={compact} key={session.id} session={session} />
      ))}
    </StyledList>
  );
};

export default SessionList;
