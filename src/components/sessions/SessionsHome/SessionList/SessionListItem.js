import React from "react";
import { bool } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { formatDate } from "../../../../utils/dateUtils";
import { Lookup } from "../../../ui";

const StyledItem = styled(Link)(({ compact, theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${color.primary};
    border-radius: ${space.sm};
    display: grid;
    grid-template-columns: ${compact ? "9em" : "10em"} 1fr;
    text-decoration: none;

    & > div {
      padding: ${compact ? `${space.thin} ${space.md}` : space.md}
      font-size: ${compact ? "0.85em" : "inherit"}
    }

    &:hover {
      border-color: ${color.primaryLight};
    }
  `;
});
const DateCell = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.primary};
    color: ${color.primaryAltText};
    font-weight: bold;

    ${StyledItem}:hover > & {
      background: ${color.primaryLight};
    }
  `;
});

const SessionListItem = ({ compact, session }) => {
  const { date, id, location } = session;

  return (
    <StyledItem to={`/sessions/${id}`} compact={compact ? 1 : 0}>
      <DateCell>{formatDate(date.toDate())}</DateCell>
      <div>
        <Lookup collection="gamingLocations" recordId={location} />
      </div>
    </StyledItem>
  );
};

export default SessionListItem;