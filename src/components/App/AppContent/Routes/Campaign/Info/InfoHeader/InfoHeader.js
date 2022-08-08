import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCampaign } from '../../../../../../../hooks';

const StyledHeader = styled.div(({ theme }) => {
  const { headers } = theme;

  return `
    background: ${headers.infoBackground};
    border-bottom: ${headers.infoBottomBorder};
    display: flex;
    justify-content: center;
  `;
});
const Container = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    max-width: 72em;
    width: 100%;
    
    & > * {
      display: grid;
      align-items: center;
      padding: ${space.md} ${space.lg};
    }
  `;
});
const HeaderLink = styled(Link)(({ active, theme }) => {
  const { headers } = theme;
  return `
    background: ${active ? headers.infoBackgroundActive : 'inherit'};
    color: inherit;
    text-decoration: none;

    &:hover {
      background: ${headers.infoBackgroundHover}
    }
  `;
});

const InfoHeader = () => {
  const { categoryKey } = useParams();
  const { key: campaignKey, articleCategories } = useCampaign();

  return (
    <StyledHeader>
      <Container>
        {articleCategories.map(({ id, key: articleCategoryKey, name }) => (
          <HeaderLink
            to={`/campaign/${campaignKey}/info/${articleCategoryKey}`}
            key={id}
            active={categoryKey === articleCategoryKey ? 1 : 0}
          >
            {name}
          </HeaderLink>
        ))}
      </Container>
    </StyledHeader>
  );
};

export default InfoHeader;
