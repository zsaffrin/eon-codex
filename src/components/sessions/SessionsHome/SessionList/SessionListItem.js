import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

import { formatDate } from "../../../../utils/dateUtils";
import { Lookup } from "../../../ui";

const StyledItem = styled(Link)(({ maincolor, compact, theme }) => {
  const { color, space } = theme;
  const primaryColor = tinycolor(maincolor);
  return `
    border: 1px solid ${primaryColor};
    border-radius: ${space.sm};
    display: grid;
    grid-template-columns: ${compact ? "9em" : "10em"} 1fr;
    text-decoration: none;

    & > div {
      padding: ${compact ? `${space.thin} ${space.md}` : space.md}
      font-size: ${compact ? "0.85em" : "inherit"}
    }

    &:hover {
      border-color: ${
        primaryColor.isLight()
          ? primaryColor.darken(20)
          : primaryColor.lighten(10)
      };
    }
  `;
});
const DateCell = styled.div(({ maincolor, theme }) => {
  const { color } = theme;
  const primaryColor = tinycolor(maincolor);

  return `
    background: ${primaryColor};
    color: ${color.background};
    font-weight: bold;

    ${StyledItem}:hover > & {
      background: ${primaryColor.darken(10)};
    }
  `;
});
const ContentCell = styled.div(({ maincolor }) => {
  const primaryColor = tinycolor(maincolor);

  return `
    color: ${primaryColor.darken(10)};

    &:hover {
      color: ${primaryColor.darken(10)};
    }
  `;
});

const SessionListItem = ({ compact, mainColor, session }) => {
  const { date, id, location } = session;

  return (
    <StyledItem
      to={`/sessions/${id}`}
      compact={compact ? 1 : 0}
      maincolor={mainColor}
    >
      <DateCell maincolor={mainColor}>{formatDate(date.toDate())}</DateCell>
      <ContentCell maincolor={mainColor}>
        <Lookup collection="gamingLocations" recordId={location} />
      </ContentCell>
    </StyledItem>
  );
};

export default SessionListItem;
