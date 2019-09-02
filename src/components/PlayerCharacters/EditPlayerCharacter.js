import React, { useContext, useState } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { Button, Input, VerticalList } from "../ui";

const fields = [{ name: "name" }];

const EditPlayerCharacter = ({ close, pc }) => {
  const [item, setItem] = useState(pc || {});
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
      const res = pc
        ? await firebase.updateDoc(`playerCharacters/${pc.id}`, item)
        : await firebase.addDoc("playerCharacters", item);
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
      const res = await firebase.deleteDoc(`playerCharacters/${pc.id}`);
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
      <h1>Edit PC</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <VerticalList
          items={fields.map(({ name }) => ({
            label: "name",
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
        <Button type="submit">{pc ? "Save Changes" : "Add PC"}</Button>
        {pc && <Button onClick={deleteItem}>Delete</Button>}
      </div>
      <pre>{JSON.stringify(pc, " ", 2)}</pre>
    </div>
  );
};

export default EditPlayerCharacter;
