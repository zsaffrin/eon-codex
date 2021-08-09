import { Link } from 'react-router-dom';
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
  
const StyledLink = styled(Link)(({ theme }) => {
  const { headers, space } = theme;
  
  return `
    color: inherit;
    display: flex;
    align-items: center;
    padding: ${space.sm} ${space.md};
    text-decoration: none;

    &:hover {
      background: ${headers.backgroundHover};
    }
  `;
});

const CampaignHeader = () => {
  const { key, name } = useCampaign();

  return (
    <StyledDiv>
      <StyledLink to={`/campaign/${key}`} title="Campaign Home">
        <H l={1} compact>{name}</H>
      </StyledLink>
      <StyledLink to={`/campaign/${key}/setup`} title="Campaign Setup">
        <FaCog />
      </StyledLink>
    </StyledDiv>
  );
};

export default CampaignHeader;
