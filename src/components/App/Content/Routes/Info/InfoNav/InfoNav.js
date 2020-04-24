import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import InfoNavItem from './InfoNavItem';

const StyledNav = styled.div(({ items, theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.lightgray};
    border-bottom: none;
    display: grid;
    grid-template-columns: repeat(${items}, 1fr);
    align-items: center;
  `;
});

const navItems = [
  {
    name: 'Groups',
    fieldKey: 'groups',
  },
  {
    name: 'People',
    fieldKey: 'people',
  },
  {
    name: 'Places',
    fieldKey: 'places',
  },
  {
    name: 'PCs',
    fieldKey: 'playerCharacters',
  },
];

const InfoNav = () => {
  const { collectionId } = useParams();

  return (
    <StyledNav items={navItems.length}>
      {navItems.map((item) => (
        <InfoNavItem
          item={item}
          key={item.fieldKey}
          active={collectionId === item.fieldKey}
        />
      ))}
    </StyledNav>
  );
};

export default InfoNav;
