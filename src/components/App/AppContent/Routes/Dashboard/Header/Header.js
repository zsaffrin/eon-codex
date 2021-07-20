import { useHistory } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import styled from 'styled-components';

import { Button, ButtonRow, H } from '../../../../../ui';

const StyledHeader = styled.header(({ theme }) => {
  const { headers, space } = theme;
  return `
    background: ${headers.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${space.sm} ${space.md};
  `;
});

const Header = () => {
  const history = useHistory();
  
  return (
    <StyledHeader>
      <H l={1} compact onClick={() => history.push('/')}>
        Eon Codex
      </H>
      <ButtonRow>
        <Button onClick={() => history.push('/setup')}>
          <FaCog style={{ verticalAlign: 'middle' }} />
        </Button>
        <Button onClick={() => history.push('/logout')}>Logout</Button>
      </ButtonRow>
    </StyledHeader>
  );
};

export default Header;
