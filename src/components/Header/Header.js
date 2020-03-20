import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../contexts';
import { Icon, Loading } from '../ui';
import { Identity, LoginStatus } from './Identity';
import HeaderNav from './HeaderNav';

const HeaderContent = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled(Link)`
  display: block;
  color: inherit;
  font-weight: bold;
  letter-spacing: 3px;
  text-decoration: none;
  text-transform: uppercase;
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
`;
const PlainLink = styled(Link)`
  text-decoration: none;
`;

const Header = () => {
  const { user, userLoaded } = useContext(UserContext);

  return (
    <header>
      <HeaderContent>
        <Title to="/">Eon Codex</Title>
        <Actions>
          {!userLoaded ? (
            <Loading />
          ) : (
            <>
              {user && user.canEdit && (
              <div>
                <PlainLink to="/settings">
                  <Icon name="cog" fixedWidth />
                </PlainLink>
              </div>
              )}
              <Identity />
              <LoginStatus />
            </>
          )}
        </Actions>
      </HeaderContent>
      <HeaderNav />
    </header>
  );
};

export default Header;
