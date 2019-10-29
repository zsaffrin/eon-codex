import React from "react";
import { Link } from "react-router-dom";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading, Page } from "../ui";

const MenusHome = () => {
  const [menus, menusLoading] = useCollection("menus");

  return menusLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>Menus</h1>
      <ul>
        {menus.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/settings/menu/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default MenusHome;
