import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useCampaign } from '../../../../../../hooks';
import { H } from '../../../../../ui';

const StyledHeader = styled.div(({ theme }) => {
  const { headers, space } = theme;

  return `
    background: ${headers.mainBackground};
    border-bottom: ${headers.mainBottomBorder};
    display: flex;
    justify-content: start;

    & > * {
      display: grid;
      align-items: center;
      padding: ${space.sm} ${space.md};
    }
  `;
});
const HeaderLink = styled(Link)(({ active, theme }) => {
  const { headers } = theme;
  return `
    background: ${active ? headers.mainBackgroundActive : 'inherit'};
    color: inherit;
    text-decoration: none;

    &:hover {
      background: ${headers.mainBackgroundHover}
    }
  `;
});

const CampaignHeader = () => {
  const { pathname } = useLocation();
  const { key, name } = useCampaign();

  const pageLocation = pathname.split('/')[3];

  const headerLinkItems = [
    {
      key: 'title',
      target: `/campaign/${key}`,
      content: (<H l={1} compact>{name}</H>),
    },
    {
      key: 'players',
      target: `/campaign/${key}/players`,
      content: 'Players',
    },
    {
      key: 'characters',
      target: `/campaign/${key}/characters`,
      content: 'Characters',
    },
    {
      key: 'sessions',
      target: `/campaign/${key}/sessions`,
      content: 'Sessions',
    },
    {
      key: 'info',
      target: `/campaign/${key}/info`,
      content: 'Info',
    },
  ];

  return (
    <StyledHeader>
      {headerLinkItems.map(({ content, key, target }) => (
        <HeaderLink
          to={target}
          key={key}
          active={pageLocation && pageLocation === key ? 1 : 0}
        >
          {content}
        </HeaderLink>
      ))}
    </StyledHeader>
  );
};

export default CampaignHeader;
