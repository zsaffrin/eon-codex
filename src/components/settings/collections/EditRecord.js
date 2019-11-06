import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FirebaseContext } from "../../../contexts/firebaseContext";
import { Button, Input, Page, VerticalList } from "../../ui";

const Buttons = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-flow: column;
    grid-gap: ${space.sm};
    justify-content: center;
    padding: ${space.md};
  `;
});

const EditRecord = ({ collection, close, fields, existingItem }) => {
  const [item, setItem] = useState(existingItem || {});
  const [message, setMessage] = useState(null);
  const firebase = useContext(FirebaseContext);

  const handleFieldChange = e => {
    if (e.isDate) {
      setItem({
        ...item,
        [e.id]: e.value
      });
    } else if (e.type === "checkbox") {
      setItem({
        ...item,
        [e.target.id]: e.target.checked
      });
    } else if (e.isMultiselect) {
      setItem({
        ...item,
        [e.fieldId]: e.value
      });
    } else {
      setItem({
        ...item,
        [e.target.id]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value
      });
    }
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { id, ...rest } = item;
      const res = existingItem
        ? await firebase.updateDoc(`${collection}/${existingItem.id}`, rest)
        : await firebase.addDoc(collection, rest);
      if (res.status === "success") {
        close();
      }
      if (res.status === "error") {
        setMessage(res.result);
      }
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function deleteItem() {
    try {
      const res = await firebase.deleteDoc(`${collection}/${existingItem.id}`);
      if (res.status === "success") {
        close();
      }
      if (res.status === "error") {
        setMessage(res.result);
      }
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <Page fullWidth>
      <h1>Edit {collection} Record</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <VerticalList
          items={fields.map(({ key, name, type, lookup }) => ({
            label: name,
            content: (
              <Input
                type={type}
                id={key}
                lookup={lookup}
                value={item[key]}
                onChange={handleFieldChange}
              />
            )
          }))}
        />
      </form>
      <Buttons>
        <Button primary type="submit" onClick={handleFormSubmit}>
          {existingItem ? "Save Changes" : "Add New Record"}
        </Button>
        <Button onClick={close}>Cancel</Button>
        {existingItem && <Button onClick={deleteItem}>Delete</Button>}
      </Buttons>
    </Page>
  );
};

export default EditRecord;
