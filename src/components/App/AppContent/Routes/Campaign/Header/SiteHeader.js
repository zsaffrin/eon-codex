import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div(({ theme }) => {
  const { headers } = theme;

  return `
    background: ${headers.campaignSiteBackground};
    font-weight: bold;
    `;
});
  
const StyledLink = styled(Link)(({ theme }) => {
  const { headers, space } = theme;
  
  return `
    color: inherit;
    padding: ${space.thin} ${space.sm};
    text-decoration: none;

    &:hover {
      background: ${headers.campaignSiteBackgroundHover};
    }
  `;
});

const SiteHeader = () => {
  return (
    <StyledHeader>
      <StyledLink to="/" title="Eon Codex Dashboard">
        Eon Codex
      </StyledLink>
    </StyledHeader>
  );
};

export default SiteHeader;
