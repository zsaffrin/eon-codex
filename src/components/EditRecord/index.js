import React, { useContext, useState } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { Button, Input, VerticalList } from "../ui";

const EditRecord = ({ collection, close, fields, existingItem }) => {
  const [item, setItem] = useState(existingItem || {});
  const [message, setMessage] = useState(null);
  const firebase = useContext(FirebaseContext);

  const handleFieldChange = e => {
    setItem({
      ...item,
      [e.target.id]: e.target.value
    });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const res = existingItem
        ? await firebase.updateDoc(`${collection}/${existingItem.id}`, item)
        : await firebase.addDoc(collection, item);
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
    <div>
      <h1>Edit Session</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <VerticalList
          items={fields.map(({ name }) => ({
            label: name,
            content: (
              <Input
                type="text"
                id={name}
                value={item[name]}
                onChange={handleFieldChange}
              />
            )
          }))}
        />
      </form>
      <div>
        <Button onClick={close}>Cancel</Button>
        <Button type="submit" onClick={handleFormSubmit}>
          {existingItem ? "Save Changes" : "Add New Record"}
        </Button>
        {existingItem && <Button onClick={deleteItem}>Delete</Button>}
      </div>
      <pre>{JSON.stringify(existingItem, " ", 2)}</pre>
    </div>
  );
};

export default EditRecord;
