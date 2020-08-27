import React, { useState } from 'react';
import { string } from 'prop-types';

import { useCurrentUser, useFirebase } from '../../../../../hooks';
import { Button, ButtonRow, Input } from '../../../../ui';

const PlayerNotesEditor = ({ article, collection }) => {
  const [addMode, setAddMode] = useState(false);
  const [note, setNote] = useState('');
  const { user } = useCurrentUser();
  const firebase = useFirebase();

  const resetMode = () => {
    setAddMode(false);
    setNote('');
  };

  const enableAddMode = () => setAddMode(true);

  const insertNewNote = async () => {
    try {
      const res = await firebase.addDoc('notes', {
        content: note,
        player: user.uid,
        article,
        collection,
      });
      if (res.status === 'success') { resetMode(); }
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  const updateNote = (e) => {
    setNote(e.value);
  };

  return addMode ? (
    <div>
      <Input type="EpX4vmYkb5yrNBCvrw4H" value={note} onChange={updateNote} />
      <ButtonRow align="start">
        <Button small primary onClick={insertNewNote}>Add Note</Button>
        <Button small onClick={resetMode}>Cancel</Button>
      </ButtonRow>
    </div>
  ) : (
    <div>
      <Button small onClick={enableAddMode}>Add Note</Button>
    </div>
  );
};

PlayerNotesEditor.propTypes = {
  article: string,
  collection: string,
};
PlayerNotesEditor.defaultProps = {
  article: null,
  collection: null,
};

export default PlayerNotesEditor;
