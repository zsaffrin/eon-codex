import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FirebaseContext } from "../../../contexts/firebaseContext";
import { Button, Input } from "../../ui";

const StyledMenuItem = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const MenuItem = ({ item }) => {
  const [menuItem, setMenuItem] = useState(item);
  const [edit, setEdit] = useState(false);
  const firebase = useContext(FirebaseContext);

  const { desc, itemKey, name } = menuItem;

  const toggleEdit = () => setEdit(!edit);

  const handleFieldChange = e => {
    setMenuItem({
      ...menuItem,
      [e.target.id]: e.target.value
    });
  };

  const cancelEdit = () => {
    setMenuItem(item);
    toggleEdit();
  };

  async function saveItem() {
    toggleEdit();
    try {
      const { id, ...rest } = menuItem;
      const res = await firebase.updateDoc(`menuItems/${id}`, rest);
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

  async function deleteItem() {
    toggleEdit();
    try {
      const { id } = menuItem;
      const res = await firebase.db.doc(`menuItems/${id}`).delete();
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

  return (
    <StyledMenuItem>
      <div>
        {edit ? (
          <Input
            type="text"
            id="itemKey"
            value={itemKey}
            onChange={handleFieldChange}
          />
        ) : (
          itemKey
        )}
      </div>
      <div>
        {edit ? (
          <Input
            type="text"
            id="name"
            value={name}
            onChange={handleFieldChange}
          />
        ) : (
          name
        )}
      </div>
      <div>
        {edit ? (
          <Input
            type="text"
            id="desc"
            value={desc}
            onChange={handleFieldChange}
          />
        ) : (
          desc
        )}
      </div>
      <div>
        {edit ? (
          <>
            <Button small onClick={saveItem}>
              Save
            </Button>
            <Button small onClick={cancelEdit}>
              Cancel
            </Button>
            <Button small onClick={deleteItem}>
              Delete
            </Button>
          </>
        ) : (
          <Button small onClick={toggleEdit}>
            Edit
          </Button>
        )}
      </div>
    </StyledMenuItem>
  );
};

export default MenuItem;
