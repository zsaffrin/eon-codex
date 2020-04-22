import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '../../../../ui';

const StyledNav = styled.nav(({ theme }) => {
  const { color } = theme;
  return `
    background: ${color.primary};
    color: ${color.background};
    display: flex;
    justify-content: center;
  `;
});
const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 48em;
  width: 100%;
`;
const NavItemGroup = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const NavItem = styled(Link)(({ theme }) => {
  const { color, space } = theme;
  return `
    background: inherit;
    color: inherit;
    display: block;
    font-size: 0.9rem;
    padding: ${space.sm} ${space.md};
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      background: ${color.background};
      color: ${color.primary};
    }
  `;
});

const linkGroups = [
  {
    g: 1,
    items: [
      { i: 1, url: '/', content: <Icon name="home" /> },
      { i: 2, url: '/sessions', content: 'Sessions' },
      { i: 3, url: '/info', content: 'Info' },
      { i: 4, url: '/loot', content: 'Loot' },
    ],
  },
  {
    g: 2,
    items: [
      { i: 1, url: '/setup', content: <Icon name="cog" /> },
      { i: 2, url: '/profile', content: <Icon name="user" /> },
    ],
  },
];

const HeaderNav = () => (
  <StyledNav>
    <ContentWrap>
      {linkGroups.map(({ g, items }) => (
        <NavItemGroup key={g}>
          {items.map(({ i, url, content }) => (
            <li key={i}>
              <NavItem to={url}>{content}</NavItem>
            </li>
          ))}
        </NavItemGroup>
      ))}
    </ContentWrap>
  </StyledNav>
);

export default HeaderNav;
