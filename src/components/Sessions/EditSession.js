import React, { useContext, useState } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { Button, Input, VerticalList } from "../ui";

const fields = [{ name: "location" }];

const EditSession = ({ close, session }) => {
  const [item, setItem] = useState(session || {});
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
      const res = session
        ? await firebase.updateDoc(`sessions/${session.id}`, item)
        : await firebase.addDoc("sessions", item);
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
      const res = await firebase.deleteDoc(`sessions/${session.id}`);
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
          {session ? "Save Changes" : "Add session"}
        </Button>
        {session && <Button onClick={deleteItem}>Delete</Button>}
      </div>
      <pre>{JSON.stringify(session, " ", 2)}</pre>
    </div>
  );
};

export default EditSession;
