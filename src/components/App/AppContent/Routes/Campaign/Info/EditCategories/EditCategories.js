import { useCampaign } from '../../../../../../../hooks';
import { Button, ButtonRow, Page, PageHeader } from '../../../../../../ui';

import CategoryList from './CategoryList';

const EditCategories = ({ close }) => {
  const { articleCategories } = useCampaign();

  return (
    <Page>
      <PageHeader title="Edit Categories" />
      <CategoryList categories={articleCategories} />
      <ButtonRow>
        <Button primary label="Done" onClick={() => close()} />
      </ButtonRow>
    </Page>
  );
};

export default EditCategories;
