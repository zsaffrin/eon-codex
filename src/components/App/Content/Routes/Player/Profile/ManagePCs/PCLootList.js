import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import PCLootListItem from './PCLootListItem';

const StyledList = styled.ul(({ theme }) => {
  const { space } = theme;
  return `
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${space.md};
  `;
});

const PCLootList = ({ loot, sessions }) => (
  <StyledList>
    {loot.length > 0
      ? loot.map((item) => (
        <PCLootListItem
          item={item}
          key={item.id}
          session={sessions.find((s) => s.id === item.session)}
        />
      ))
      : 'None yet'}
  </StyledList>
);
PCLootList.propTypes = {
  loot: arrayOf(shape({})),
  sessions: arrayOf(shape({})),
};
PCLootList.defaultProps = {
  loot: [],
  sessions: [],
};

export default PCLootList;
