import React from "react";
import { string } from "prop-types";

import { useCollection } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";
import SelectInput from "./SelectInput";

const MenuSelect = ({ menuName, ...rest }) => {
  const [menuItems, menuItemsLoading] = useCollection("menuItems", [
    "menu",
    "==",
    menuName
  ]);

  const choices = menuItems
    ? menuItems.map(({ itemKey, name }) => ({ id: itemKey, name }))
    : [];

  return menuItemsLoading ? (
    <Loading />
  ) : (
    <SelectInput choices={choices} {...rest} />
  );
};
MenuSelect.propTypes = {
  menuName: string
};
MenuSelect.defaultProps = {
  menuName: " "
};

export default MenuSelect;
