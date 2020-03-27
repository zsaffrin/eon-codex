import React from 'react';

import { useCollection } from '../../../hooks/firestoreHooks';
import Loading from '../Loading';

const MenuCell = ({ menu, fieldValue }) => {
  const [menuItems, menuItemsLoading] = useCollection('menuItems', [
    'menu',
    '==',
    menu,
  ]);
  const chosenItem = menuItems && menuItems.find((item) => item.itemKey === fieldValue);

  return menuItemsLoading ? (
    <Loading />
  ) : (
    <div>{chosenItem && chosenItem.name}</div>
  );
};

export default MenuCell;
