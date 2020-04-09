import React from 'react';
import { string } from 'prop-types';

import { useCollection } from '../../hooks/firestoreHooks';
import Loading from './Loading';

const MenuLookup = ({ menu, itemKey }) => {
  const [menuItems, menuItemsLoading] = useCollection('menuItems', [
    'menu',
    '==',
    menu,
  ]);
  const chosenItem = menuItems && menuItems.find((item) => item.itemKey === itemKey);

  return menuItemsLoading ? <Loading /> : (
    <span>{chosenItem && chosenItem.name}</span>
  );
};
MenuLookup.propTypes = {
  menu: string,
  itemKey: string,
};
MenuLookup.defaultProps = {
  menu: '',
  itemKey: '',
};

export default MenuLookup;
