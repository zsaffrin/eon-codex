import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '../../../../../../hooks';
import { H } from '../../../../../ui';

const StyledHeader = styled.div(({ theme }) => {
  const { headers, space } = theme;

  return `
    background: ${headers.mainBackground};
    border-bottom: ${headers.mainBottomBorder};
    display: flex;
    justify-content: space-between;

    & > * {
      display: grid;
      align-items: center;
      padding: ${space.sm} ${space.md};
    }
  `;
});
const Spacer = styled.div`
  flex-grow: 1;
`;
const HeaderLink = styled(Link)(({ theme }) => {
  const { headers } = theme;
  return `
    color: inherit;
    text-decoration: none;

    &:hover {
      background: ${headers.mainBackgroundHover}
    }
  `;
});

const Header = () => {
  const [user] = useUser();
  
  return (
    <StyledHeader>
      <HeaderLink to="/">
        <H l={1} compact>EonCodex v0.6</H>
      </HeaderLink>
      <Spacer />
      {user 
        ? (
          <>
            <HeaderLink to="/profile">
              {user.email}
            </HeaderLink>
            <HeaderLink to="/logout">
              Log Out
            </HeaderLink>
          </>
        ) 
        : (
          <>
            <HeaderLink to="/login">
              Log In
            </HeaderLink>
          </>
        )}
    </StyledHeader>
  );
};

export default Header;
