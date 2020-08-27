import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

import { useCurrentUser, useFirebase } from '../../../../../hooks';
import {
  Button, ButtonRow, Icon, Input,
} from '../../../../ui';

const StyledNote = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: 4rem 1fr min-content;
    grid-gap: ${space.md}
  `;
});
const PlayerName = styled.div(({ theme }) => {
  const { color } = theme;
  return `
  color: ${color.secondary};
  font-weight: bold;
  `;
});
const NoteContent = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: ${space.md};
    font-size: 0.9rem;
  `;
});
const VerticalButtonRow = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: ${space.md};
  `;
});
const ConfirmDelete = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.danger};
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
  `;
});


const PlayerNote = ({ noteId, note, player }) => {
  const [noteContent, setNoteContent] = useState(note);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const firebase = useFirebase();
  const { user } = useCurrentUser();

  const updateNote = (e) => {
    setNoteContent(e.value);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setNoteContent(note);
  };

  const saveNoteChanges = async () => {
    try {
      console.info(`Updating note ${noteId}`);
      const res = await firebase.updateDoc(`notes/${noteId}`, { content: noteContent });
      if (res.status === 'success') { setEditMode(false); }
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  const deleteNote = async () => {
    try {
      console.info(`Deleting note ${noteId}`);
      const res = await firebase.deleteDoc(`notes/${noteId}`);
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  let buttons = (
    <ButtonRow compact>
      <Button tiny onClick={() => setEditMode(true)}>
        <Icon name="edit" />
      </Button>
      <Button tiny onClick={() => setDeleteMode(true)}>
        <Icon name="trash-alt" />
      </Button>
    </ButtonRow>
  );
  if (editMode) {
    buttons = (
      <VerticalButtonRow compact>
        <Button tiny primary onClick={saveNoteChanges}>
          Save
        </Button>
        <Button tiny onClick={exitEditMode}>
          Cancel
        </Button>
      </VerticalButtonRow>
    );
  }
  if (deleteMode) {
    buttons = (
      <VerticalButtonRow compact>
        <ConfirmDelete>
          DELETE NOTE
          <br />
          Are you sure?
        </ConfirmDelete>
        <Button tiny danger onClick={deleteNote}>
          Yes, Delete
        </Button>
        <Button tiny onClick={() => setDeleteMode(false)}>
          No, Cancel
        </Button>
      </VerticalButtonRow>
    );
  }

  return (
    <StyledNote>
      <PlayerName>{player.name}</PlayerName>
      {editMode ? (
        <Input
          type="EpX4vmYkb5yrNBCvrw4H"
          value={noteContent}
          onChange={updateNote}
        />
      ) : (
        <NoteContent>{noteContent}</NoteContent>
      )}
      {user.uid === player.id && buttons}
    </StyledNote>
  );
};

PlayerNote.propTypes = {
  noteId: string,
  note: string,
  player: shape({}),
};
PlayerNote.defaultProps = {
  noteId: '',
  note: '',
  player: {},
};

export default PlayerNote;
