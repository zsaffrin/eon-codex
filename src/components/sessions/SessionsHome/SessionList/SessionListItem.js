import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";

import { formatDate } from "../../../../utils/dateUtils";
import { Lookup } from "../../../ui";

const StyledItem = styled(Link)(({ maincolor, theme }) => {
  const { space } = theme;

  return `
    border: 1px solid ${maincolor};
    border-radius: ${space.sm};
    text-decoration: none;

    ${StyledItem}:hover {
      border-color: ${tinycolor(maincolor).darken(10)}
    }
  `;
});
const ItemHeader = styled.div(({ maincolor, theme }) => {
  const { color, space } = theme;

  return `
    display: flex;
  
    & > div {
      background: ${maincolor};
      color: ${color.background};
      font-weight: bold;
      padding: ${space.sm} ${space.md};

      ${StyledItem}:hover & {
        background: ${tinycolor(maincolor).darken(10)}
      }
    }
  `;
});
const NumberCell = styled.div`
  text-align: center;
  width: 2.5em;
`;
const TitleCell = styled.div`
  flex-grow: 1;
`;
const ItemContent = styled.div(({ maincolor, theme }) => {
  const { space } = theme;

  return `
    color: ${maincolor};
    padding: ${space.sm} ${space.md};

    ${StyledItem}:hover & {
      color: ${tinycolor(maincolor).darken(10)}
    }
  `;
});

const SessionListItem = ({ mainColor, session }) => {
  const { date, id, location, sessionNumber, title } = session;

  return (
    <StyledItem to={`/sessions/${id}`} maincolor={mainColor}>
      <ItemHeader maincolor={mainColor}>
        {title ? (
          <>
            <NumberCell>{sessionNumber}</NumberCell>
            <TitleCell>{title}</TitleCell>
          </>
        ) : (
          <TitleCell>{`Session ${sessionNumber}`}</TitleCell>
        )}
      </ItemHeader>
      <ItemContent maincolor={mainColor}>
        {`${formatDate(date.toDate())} @ `}
        <Lookup collection="gamingLocations" recordId={location} noLink />
      </ItemContent>
    </StyledItem>
  );
};

export default SessionListItem;
