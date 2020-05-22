import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { Link } from '../../../../../../ui';

const StyledItem = styled.li(({ claimed, theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${claimed ? color.accent : color.primary};
    border-radius: 4px;
    font-size: 0.85rem;
    padding: ${space.sm};
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${space.sm};
  `;
});
const Small = styled.div`
  font-size: 0.7rem;
`;

const PCLootListItem = ({ item, session }) => {
  const { name, url, comments } = item;

  return (
    <StyledItem>
      <div>
        {url
          ? <Link to={url} external>{name}</Link>
          : <div>{name}</div>}
        {comments && <Small>{comments}</Small>}
      </div>
      <Small>
        <Link to={`/sessions/${session.id}`}>
          {`Session ${session.sessionNumber}`}
        </Link>
      </Small>
    </StyledItem>
  );
};

PCLootListItem.propTypes = {
  item: shape({}),
  session: shape({}),
};
PCLootListItem.defaultProps = {
  item: {},
  session: {},
};

export default PCLootListItem;
