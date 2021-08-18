import { Link, useLocation } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign } from '../../../../../../hooks';
import { H } from '../../../../../ui';

const StyledDiv = styled.div(({ theme }) => {
  const { headers } = theme;

  return `
    background: ${headers.background};
    display: flex;
    justify-content: space-between;
  `;
});

const LinkGroup = styled.div`
  display: grid;
`;

const StyledLink = styled(Link)(({ theme }) => {
  const { headers, space } = theme;
  
  return `
    color: inherit;
    display: grid;
    align-items: center;
    padding: ${space.sm} ${space.md};
    text-decoration: none;

    &:hover {
      background: ${headers.backgroundHover};
    }
  `;
});


const CampaignHeader = () => {
  const { pathname } = useLocation();
  const { key, name } = useCampaign();

  const shouldShowSetupLink = !pathname.includes(`/campaign/${key}/setup`);

  return (
    <StyledDiv>
      <LinkGroup>
        <StyledLink to={`/campaign/${key}`} title="Campaign Home">
          <H l={1} compact>{name}</H>
        </StyledLink>
      </LinkGroup>
      <LinkGroup>
        {shouldShowSetupLink && (
          <StyledLink to={`/campaign/${key}/setup`} title="Campaign Setup">
            <FaCog />
          </StyledLink>
        )}
      </LinkGroup>
    </StyledDiv>
  );
};

export default CampaignHeader;
