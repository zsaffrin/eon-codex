import React from "react";

import { useCollection } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";

const MenuCell = ({ menu, fieldValue }) => {
  const [menuItems, menuItemsLoading] = useCollection("menuItems", [
    "menu",
    "==",
    menu
  ]);
  const chosenItem =
    menuItems && menuItems.find(item => item.itemKey === fieldValue);

  return menuItemsLoading || !chosenItem ? (
    <Loading />
  ) : (
    <div>{chosenItem.name}</div>
  );
};

export default MenuCell;
