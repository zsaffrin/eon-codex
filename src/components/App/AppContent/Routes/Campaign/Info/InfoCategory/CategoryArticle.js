import { shape } from "prop-types";

import { Page, PageHeader, Markdown } from '../../../../../../ui';

const CategoryArticle = ({ article }) => {
  return (
    <Page>
      <PageHeader title={article.name} />
      <Markdown content={article.content} />
    </Page>
  );
};
CategoryArticle.propTypes = {
  article: shape({}),
};
CategoryArticle.defaultProps = {
  article: {},
};

export default CategoryArticle;
