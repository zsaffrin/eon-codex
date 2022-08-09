import { FaCog, FaPlus } from 'react-icons/fa';

import { useCampaign, useToggledModal } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, ItemList, Page, PageHeader } from '../../../../../ui';
import AddArticle from './AddArticle';
import EditCategories from './EditCategories';

const Info = () => {
  const { key: campaignKey, articleCategories } = useCampaign();
  const [addArticleModal, toggleAddArticleModal] = useToggledModal(AddArticle);
  const [editCategoriesModal, toggleEditCategoriesModal] = useToggledModal(EditCategories);

  const categoryListItems = articleCategories.map(({ id, name, key }) => ({
    key: id,
    content: (<H compact l={3}>{name}</H>),
    to: `/campaign/${campaignKey}/info/${key}`,
  }));

  return (
    <Page>
      {addArticleModal}
      {editCategoriesModal}
      <PageHeader
        campaignKey={campaignKey}
        title="Info"
        breadcrumbs={[]}
        content={(
          <ButtonRow>
            <Button small icon={<FaCog />} label="Categories" onClick={toggleEditCategoriesModal} />
            <Button primary small icon={<FaPlus />} label="New Article" onClick={toggleAddArticleModal} />
          </ButtonRow>
        )}
      />
      <Box>
        <ItemList items={categoryListItems} isLinks />
      </Box>
    </Page>
  );
};

export default Info;
