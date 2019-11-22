import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { FirebaseContext, UserContext } from "../../../contexts";
import { Button, Input } from "../../ui";

const NoteAdder = () => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { categoryId, recordId } = useParams();
  const [active, setActive] = useState(false);
  const [newNote, setNewNote] = useState("");

  async function saveNote() {
    try {
      const noteToAdd = {
        collection: categoryId,
        article: recordId,
        player: user.uid,
        content: newNote
      };
      const res = await firebase.addDoc("notes", noteToAdd);
      if (res.status === "success") {
        console.error(res);
      }
      if (res.status === "error") {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleFieldChange = e => {
    setNewNote(e.target.value);
  };

  const handleCancel = () => {
    setActive(false);
    setNewNote("");
  };

  return (
    <>
      <div />

      <div>
        {active ? (
          <>
            <div>
              <Input
                type="longtext"
                id="content"
                value={newNote}
                onChange={handleFieldChange}
                height={3}
              />
            </div>
            <div>
              <Button primary small onClick={saveNote}>
                Save Note
              </Button>
              <Button small onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <Button small onClick={() => setActive(true)}>
            Add Note
          </Button>
        )}
      </div>

      <div />
    </>
  );
};

export default NoteAdder;
