import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import { useCampaign } from '../../../../../../../hooks';
import { Link } from '../../../../../../ui';

const StyledListItem = styled(Link)(({ theme }) => {
  const { borders, links, space } = theme;

  return `
    border-bottom: 1px solid ${borders.color};
    color: inherit;
    padding: ${space.thin};

    &:hover {
      background: ${links.backgroundHover};
      color: inherit;
      text-decoration: none;
    }
  `;
});

const CategoryArticleList = ({ articles }) => {
  const { categoryKey, articleId } = useParams();
  const { key: campaignKey } = useCampaign();

  const articleItems = articles.map(({ id, name }) => (
    <StyledListItem
      key={id}
      to={`/campaign/${campaignKey}/info/${categoryKey}/${id}`}
      active={(articleId === id)}
    >
      {name}
    </StyledListItem>
  ));
  
  return (
    <div>
      {articleItems}
    </div>
  );
};
CategoryArticleList.propTypes = {
  articles: arrayOf(shape({})),
};
CategoryArticleList.defaultProps = {
  articles: [],
};

export default CategoryArticleList;
