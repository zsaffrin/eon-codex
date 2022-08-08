import { Navigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign, useToggledModal } from '../../../../../../../hooks';
import { Button, ButtonRow, Page, PageHeader } from '../../../../../../ui';
import InfoHeader from '../InfoHeader';
import CategoryArticleList from './CategoryArticleList';
import CategoryArticle from './CategoryArticle';
import AddArticle from '../AddArticle';

const ArticleSelectorLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
const ArticleContent = styled.div(({ theme }) => {
  const { borders, layout } = theme;

  return `
    border: 1px solid ${borders.color};
    border-radius: ${layout.borderRadius};
  `;
});

const InfoCategory = () => {
  const { key: campaignKey, articles, articleCategories } = useCampaign();
  const { articleId, categoryKey } = useParams();
  const category = articleCategories.find(({ key }) => key === categoryKey);
  const [addArticleModal, toggleAddArticleModal] = useToggledModal(AddArticle, {
    contextCategoryId: category.id,
  });


  if (!category) {
    return (
      <Navigate to={`/campaign/${campaignKey}/info`} replace />
    );
  }

  const categoryArticles = articles.filter(({ category: categoryId }) => (
    category.id === categoryId
  ));

  const article = articles.find(({ id }) => id === articleId);

  return (
    <>
      <InfoHeader />
      <Page>
        {addArticleModal}
        <PageHeader
          campaignKey={campaignKey}
          title={category.name}
          breadcrumbs={[
            {
              label: 'Info',
              target: `/campaign/${campaignKey}/info`,
            },
          ]}
          content={(
            <ButtonRow>
              <Button small icon={<FaPlus />} label="New Article" onClick={toggleAddArticleModal} />
            </ButtonRow>
          )}
        />
        <ArticleSelectorLayout>
          <CategoryArticleList articles={categoryArticles} />
          <ArticleContent>
            {article && <CategoryArticle article={article} />}
          </ArticleContent>
        </ArticleSelectorLayout>
      </Page>
    </>
  );
};

export default InfoCategory;
