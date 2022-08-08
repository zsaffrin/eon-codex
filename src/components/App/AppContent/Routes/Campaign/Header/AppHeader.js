import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div(({ theme }) => {
  const { headers, space } = theme;

  return `
    background: ${headers.secondaryBackground};
    border-bottom: ${headers.secondaryBottomBorder};
    display: flex;
    justify-content: space-between;

    & > * {
      display: grid;
      align-items: center;
      padding: ${space.sm} ${space.md};
    }
  `;
});
const HeaderLink = styled(Link)(({ theme }) => {
  const { headers } = theme;
  return `
    color: inherit;
    text-decoration: none;

    &:hover {
      background: ${headers.secondaryBackgroundHover}
    }
  `;
});
const Title = styled(HeaderLink)`
  font-size: 0.9rem;
  font-weight: bolder;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const AppHeader = () => {
  return (
    <StyledHeader>
      <Title to="/">
        Eon Codex
      </Title>
    </StyledHeader>
  );
};

export default AppHeader;
