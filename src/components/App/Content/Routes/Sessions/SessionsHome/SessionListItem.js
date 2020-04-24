import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import tinycolor from 'tinycolor2';

import { formatDate } from '../../../../../../utils';
import { Lookup } from '../../../../../ui';

const StyledItem = styled(Link)(({ itemcolor, theme }) => {
  const { space } = theme;

  return `
    border: 1px solid ${itemcolor};
    border-radius: ${space.sm};
    text-decoration: none;

    ${StyledItem}:hover {
      border-color: ${tinycolor(itemcolor).darken(10)}
    }
  `;
});
const ItemHeader = styled.div(({ itemcolor, theme }) => {
  const { color, space } = theme;

  return `
    display: flex;
  
    & > div {
      background: ${itemcolor};
      color: ${color.background};
      font-weight: bold;
      padding: ${space.sm} ${space.md};

      ${StyledItem}:hover & {
        background: ${tinycolor(itemcolor).darken(10)}
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
const ItemContent = styled.div(({ itemcolor, theme }) => {
  const { space } = theme;

  return `
    color: ${itemcolor};
    padding: ${space.sm} ${space.md};

    ${StyledItem}:hover & {
      color: ${tinycolor(itemcolor).darken(10)}
    }
  `;
});

const SessionListItem = ({ sessionData }) => {
  const {
    id, sessionNumber, name, date, location, status,
  } = sessionData;
  const theme = useContext(ThemeContext);

  let itemColor = '#999';
  // Planned
  if (status === 'AaFuilqJ0uweQM4a9ku5') itemColor = theme.color.primary;
  // Playing
  if (status === 'GWEix8bXkdVMx4oYYYBa') itemColor = theme.color.danger;
  // Played
  if (status === 'DA85QyTND1xgmFo7u7Dg') itemColor = theme.color.secondary;

  return (
    <StyledItem to={`/sessions/${id}`} itemcolor={itemColor}>
      <ItemHeader itemcolor={itemColor}>
        {name ? (
          <>
            <NumberCell>{sessionNumber}</NumberCell>
            <TitleCell>{name}</TitleCell>
          </>
        ) : (
          <TitleCell>{`Session ${sessionNumber}`}</TitleCell>
        )}
      </ItemHeader>
      <ItemContent itemcolor={itemColor}>
        {`${date && date.toDate && formatDate(date.toDate())} @ `}
        <Lookup collection="gamingLocations" recordId={location} noLink />
      </ItemContent>
    </StyledItem>
  );
};

SessionListItem.propTypes = {
  sessionData: shape({
    sessionNumber: string,
    name: string,
    date: shape({}),
    location: string,
  }),
};
SessionListItem.defaultProps = {
  sessionData: null,
};

export default SessionListItem;
