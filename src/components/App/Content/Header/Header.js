import React from 'react';
import styled from 'styled-components';

import { Icon } from '../../../ui';
import HeaderNav from './HeaderNav';

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Header = () => (
  <header>
    <Title>
      EON
      {' '}
      <Icon name="dharmachakra" />
      {' '}
      CODEX
    </Title>
    <HeaderNav />
  </header>
);

export default Header;
