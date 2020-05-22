import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { useCollection } from '../../../../../../hooks';
import { Loading } from '../../../../../ui';
import LootListItem from './LootListItem';

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

const LootList = ({ items }) => {
  const [sessions, sessionsLoading] = useCollection('sessions');
  const [pcs, pcsLoading] = useCollection('playerCharacters');

  const filteredItems = items.filter((i) => i.category !== 'dipcwkNkgCZKjI2gGVFD');

  const claimedItems = [];
  const unclaimedItems = [];
  filteredItems.forEach((i) => {
    if (i.claim) {
      claimedItems.push(i);
    } else {
      unclaimedItems.push(i);
    }
  });
  const sortedItems = [
    ...unclaimedItems,
    ...claimedItems,
  ];

  return sessionsLoading || pcsLoading ? <Loading /> : (
    <StyledList>
      {sortedItems.map((i) => (
        <LootListItem
          key={i.id}
          item={i}
          session={sessions.find((s) => s.id === i.session)}
          pc={i.claim ? pcs.find((c) => c.id === i.claim) : null}
        />
      ))}
    </StyledList>
  );
};
LootList.propTypes = {
  items: arrayOf(shape({})),
};
LootList.defaultProps = {
  items: [],
};

export default LootList;
