import React from "react";
import { Link } from "react-router-dom";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const ManageMenus = () => {
  const [menus, menusLoading] = useCollection("menus");

  return menusLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Menus</h1>
      <ul>
        {menus.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/menu/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMenus;
