import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";

import { FirebaseContext, UserContext } from "../../../contexts";
import { Button, Icon, Input, Lookup, Markdown } from "../../ui";

const PlayerName = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    color: ${color.accent};
    font-weight: bold;
    padding: ${space.sm};
  `;
});

const Note = ({ record }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [workingNote, setWorkingNote] = useState(record);
  const [editNote, setEditNote] = useState(false);

  const { id, player, content } = record;

  const handleFieldChange = e => {
    setWorkingNote({
      ...workingNote,
      content: e.target.value
    });
  };

  const cancelChanges = () => {
    setEditNote(false);
    setWorkingNote(record);
  };

  async function saveNote() {
    try {
      const { id, ...rest } = workingNote;
      const res = await firebase.updateDoc(`notes/${id}`, rest);
      if (res.status === "success") {
        console.info(res);
        setEditNote(false);
      }
      if (res.status === "error") {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteNote() {
    try {
      const res = await firebase.deleteDoc(`notes/${id}`);
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

  return (
    <Fragment key={id}>
      <PlayerName>
        <Lookup collection="players" recordId={player} noLink />
      </PlayerName>

      <div>
        {editNote ? (
          <Input
            type="longtext"
            id="content"
            value={workingNote.content}
            onChange={handleFieldChange}
            height={3}
          />
        ) : (
          <Markdown content={content} />
        )}
      </div>

      {player === user.uid ? (
        <div>
          {editNote ? (
            <>
              <Button primary small onClick={saveNote}>
                Save
              </Button>
              <Button small onClick={cancelChanges}>
                Cancel
              </Button>
              <Button danger small onClick={deleteNote}>
                Delete
              </Button>
            </>
          ) : (
            <Button small onClick={() => setEditNote(true)}>
              <Icon name="edit" />
            </Button>
          )}
        </div>
      ) : (
        <div />
      )}
    </Fragment>
  );
};

export default Note;
