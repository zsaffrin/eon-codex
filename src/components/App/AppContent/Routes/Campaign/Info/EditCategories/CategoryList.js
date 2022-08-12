import { arrayOf, shape } from 'prop-types';
import { FaPlus } from 'react-icons/fa';

import { maxFieldValue, sortByKey } from '../../../../../../../utilities';
import { useCampaign, useFirebase } from '../../../../../../../hooks';
import { Button, ButtonRow, ItemList } from '../../../../../../ui';
import CategoryListItem from './CategoryListItem';

const CategoryList = ({ categories }) => {
  const { id: campaignId } = useCampaign();
  const { addDocument, updateDocument } = useFirebase();

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

  const handleOrderChange = ({ recordId, targetLocation }) => {
    categories.forEach((category) => {
      if (category.id === recordId) {
        updateDocument('articleCategories', recordId, { 
          displayOrder: targetLocation,
        });
      } else {
        if (category.displayOrder >= targetLocation) {
          updateDocument('articleCategories', category.id, {
            displayOrder: category.displayOrder + 1,
          });
        }
      }
    });
  };
  
  const listItems = categories.map(category => ({
    key: category.id,
    displayOrder: category.displayOrder,
    content: (
      <CategoryListItem category={category} />
    )
  }));
  
  return (
    <div>
      <ItemList
        items={sortByKey(listItems, 'displayOrder')}
        sortable
        sortKey="displayOrder"
        handleOrderChange={handleOrderChange}
      />
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
