import React from "react";
import { string } from "prop-types";
import styled from "styled-components";

import { sortBy } from "../../../../utils/dataUtils";
import SessionListItem from "./SessionListItem";

const StyledList = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md}
  `;
});

const SessionList = ({ mainColor, sessions }) => {
  return (
    <StyledList>
      {sortBy(sessions, "date", "desc").map(session => (
        <SessionListItem
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
