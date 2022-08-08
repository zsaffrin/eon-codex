import { shape, string } from "prop-types";
import { useState } from 'react';

import { stringToKey } from '../../../../../../../utilities';
import { useFirebase } from '../../../../../../../hooks';
import { Input } from '../../../../../../ui';

const CategoryListItem = ({ category }) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const { updateDocument } = useFirebase();

  const handleInputChange = (e) => {
    setCategoryName(e.value);
    updateDocument('articleCategories', category.id, { 
      key: stringToKey(e.value),
      name: e.value,
    });
  };
  
  return (
    <Input
      id={category.id}
      value={categoryName}
      onChange={handleInputChange}
    />
  );
};
CategoryListItem.propTypes = {
  category: shape({
    name: string,
    id: string,
  })
};
CategoryListItem.defaultProps = {
  category: {},
};

export default CategoryListItem;
