import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { randomKey } from '../../../../../utils';
import { useCurrentUser } from '../../../../../hooks';
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

const HeaderNav = () => {
  const { user } = useCurrentUser();

  const primaryNavItems = [
    {
      url: '/',
      content: <Icon name="home" />,
    },
  ];
  primaryNavItems.push({
    url: '/info',
    content: 'Info',
  });
  if (user && user.authLevelNum > 1) {
    primaryNavItems.push(
      {
        url: '/sessions',
        content: 'Sessions',
      },
      {
        url: '/loot',
        content: 'Loot',
      },
    );
  }

  const secondaryNavItems = user ? [
    {
      url: '/player',
      content: (
        <div>
          <Icon name="user" />
          {` ${user.name}`}
        </div>
      ),
    },
    { url: '/logout', content: 'Logout' },
  ] : [
    { url: '/login', content: 'Login' },
  ];
  if (user && user.authLevelNum > 3) {
    secondaryNavItems.unshift({ url: '/setup', content: <Icon name="cog" /> });
  }

  return (
    <StyledNav>
      <ContentWrap>
        {[primaryNavItems, secondaryNavItems].map((items) => (
          <NavItemGroup key={randomKey(5)}>
            {items.map(({ url, content }) => (
              <li key={randomKey(5)}>
                <NavItem to={url}>{content}</NavItem>
              </li>
            ))}
          </NavItemGroup>
        ))}
      </ContentWrap>
    </StyledNav>
  );
};

export default HeaderNav;
