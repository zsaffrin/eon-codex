import React from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '../../../../hooks';
import { Icon, Lookup } from '../../../ui';
import HeaderNav from './HeaderNav';

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
const AuthBar = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.highlight};
    color: ${color.white};
    padding: ${space.sm};
    font-size: 0.7rem;
  `;
});

const Header = () => {
  const { user } = useCurrentUser();

  return (
    <header>
      <Title>
        EON
        {' '}
        <Icon name="dharmachakra" />
        {' '}
        CODEX
      </Title>
      <HeaderNav />
      <AuthBar>
        {user ? (
          <>
            <span>{'Logged in as '}</span>
            <strong>{user.name}</strong>
            <span>{` (${user.uid}) - `}</span>
            <span>{'AuthLevel: '}</span>
            <Lookup collection="authLevels" recordId={user.authLevel} noLink />
          </>
        ) : (
          'Not logged in'
        )}
      </AuthBar>
    </header>
  );
};

export default Header;
