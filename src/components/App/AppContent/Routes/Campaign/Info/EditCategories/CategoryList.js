import { arrayOf, shape } from 'prop-types';
import { FaPlus } from 'react-icons/fa';

import { maxFieldValue } from '../../../../../../../utilities';
import { useCampaign, useFirebase } from '../../../../../../../hooks';
import { Button, ButtonRow, ItemList } from '../../../../../../ui';
import CategoryListItem from './CategoryListItem';

const CategoryList = ({ categories }) => {
  const { id: campaignId } = useCampaign();
  const { addDocument } = useFirebase();

  const addNewCategory = () => {
    const newDisplayOrder = maxFieldValue(categories, 'displayOrder') + 1;
    
    const docToAdd = {
      campaign: campaignId,
      key: '',
      name: '',
      displayOrder: newDisplayOrder,
    };
    
    addDocument('articleCategories', docToAdd);
  };
  
  const listItems = categories.map(category => ({
    key: category.id,
    content: (
      <CategoryListItem category={category} />
    )
  }));
  
  return (
    <div>
      <ItemList items={listItems} />
      <ButtonRow>
        <Button
          icon={<FaPlus />}
          onClick={addNewCategory}
        />
      </ButtonRow>
    </div>
  );
};
CategoryList.propTypes = {
  categories: arrayOf(shape({})),
};
CategoryList.defaultProps = {
  categories: [],
};

export default CategoryList;
