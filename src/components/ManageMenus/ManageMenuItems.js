import React from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const ManageMenuItems = ({ menuName }) => {
  const [menuItems, menuItemsLoading] = useCollection("menuItems", [
    "menu",
    "==",
    menuName
  ]);

  return menuItemsLoading ? (
    <Loading />
  ) : (
    <div>{JSON.stringify(menuItems)}</div>
  );
};

export default ManageMenuItems;
