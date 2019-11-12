import React from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Breadcrumb, Link, Loading, Page } from "../ui";

const MenusHome = () => {
  const [menus, menusLoading] = useCollection("menus");

  return menusLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Settings", target: "/settings" }
        ]}
      />
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
