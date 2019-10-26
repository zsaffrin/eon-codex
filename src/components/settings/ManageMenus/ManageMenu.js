import React from "react";
import { useParams } from "react-router-dom";

import { useMenu } from "../../../hooks/firestoreHooks";
import { Loading } from "../../ui";
import ManageMenuItems from "./ManageMenuItems";

const ManageMenu = () => {
  const { menuName } = useParams();
  const [menu, menuLoading] = useMenu(menuName);

  return menuLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Manage Menu</h1>
      <h2>{menu.name}</h2>
      <ManageMenuItems menuName={menuName} />
    </div>
  );
};

export default ManageMenu;
