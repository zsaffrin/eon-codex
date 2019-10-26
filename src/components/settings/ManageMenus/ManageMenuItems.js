import React, { useContext } from "react";
import styled from "styled-components";

import { FirebaseContext } from "../../../contexts/firebaseContext";
import { useCollection } from "../../../hooks/firestoreHooks";
import { Button, Loading } from "../../ui";
import MenuItem from "./MenuItem";

const columns = [
  { key: "itemKey", name: "Key" },
  { key: "name", name: "Name" },
  { key: "desc", name: "Description" }
];

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const HeaderCell = styled.div`
  font-weight: bold;
`;

const FullWidthCell = styled.div`
  grid-column: 1 / -1;
`;

const ManageMenuItems = ({ menuName }) => {
  const [menuItems, menuItemsLoading] = useCollection("menuItems", [
    "menu",
    "==",
    menuName
  ]);
  const firebase = useContext(FirebaseContext);

  async function createNewMenuItem() {
    try {
      const res = await firebase.db.collection("menuItems").add({
        itemKey: "",
        name: "",
        desc: "",
        menu: menuName
      });
      if (res.status === "success") {
      }
      if (res.status === "error") {
        // Implement message display so this works
        // setMessage(res.result);
      }
    } catch (err) {
      // Implement message display so this works
      // setMessage(err.message);
    }
  }

  return menuItemsLoading ? (
    <Loading />
  ) : (
    <div>
      <StyledHeader>
        {columns.map(({ key, name }) => (
          <HeaderCell key={`${key}Header`}>{name}</HeaderCell>
        ))}
      </StyledHeader>
      {menuItems.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
      <FullWidthCell>
        <Button onClick={createNewMenuItem}>+</Button>
      </FullWidthCell>
    </div>
  );
};

export default ManageMenuItems;
