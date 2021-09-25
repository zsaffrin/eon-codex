import { Link, useLocation } from 'react-router-dom';
import { FaCog, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign, usePlayer } from '../../../../../../hooks';
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
  grid-auto-flow: column;
`;

const StyledLink = styled(Link)(({ theme }) => {
  const { headers, space } = theme;
  
  return `
    color: inherit;
    display: grid;
    grid-auto-flow: column;
    grid-gap: ${space.sm};
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
  const [player] = usePlayer();

  const shouldShowSetupLink = !pathname.includes(`/campaign/${key}/setup`);

  return (
    <StyledDiv>
      <LinkGroup>
        <StyledLink to={`/campaign/${key}`} title="Campaign Home">
          <H l={1} compact>{name}</H>
        </StyledLink>
        <StyledLink to={`/campaign/${key}/info`} title="Info">
          Info
        </StyledLink>
        <StyledLink to={`/campaign/${key}/sessions`} title="Sessions">
          Sessions
        </StyledLink>
        <StyledLink to={`/campaign/${key}/characters`} title="Characters">
          Characters
        </StyledLink>
      </LinkGroup>
      <LinkGroup>
        <StyledLink to={`/campaign/${key}/players/${player.id}`} title="My Player">
          <FaUser />
          {player.name}
        </StyledLink>
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
