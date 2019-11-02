import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

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
      border-color: ${tinycolor(color.primary).lighten(10)};
    }
  `;
});
const DateCell = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.primary};
    color: ${tinycolor(color.primary).isLight() ? color.black : color.white};
    font-weight: bold;

    ${StyledItem}:hover > & {
      background: ${tinycolor(color.primary).lighten(10)};
    }
  `;
});
const ContentCell = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.primary};
  `;
});

const SessionListItem = ({ compact, session }) => {
  const { date, id, location } = session;

  return (
    <StyledItem to={`/sessions/${id}`} compact={compact ? 1 : 0}>
      <DateCell>{formatDate(date.toDate())}</DateCell>
      <ContentCell>
        <Lookup collection="gamingLocations" recordId={location} />
      </ContentCell>
    </StyledItem>
  );
};

export default SessionListItem;
