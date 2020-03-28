import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDocument, useFirebase } from '../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, Input, Loading,
} from '../../ui';

const LiveNotesEditor = () => {
  const { sessionId } = useParams();
  const [notes, setNotes] = useState(null);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [session, sessionLoading] = useDocument(`sessions/${sessionId}`);
  const firebase = useFirebase();

  useEffect(() => {
    if (!sessionLoading && session && !notesLoaded) {
      setNotes(session.liveNotes);
      setNotesLoaded(true);
    }
  }, [sessionLoading, session, notes]);

  const handleInputChange = (e) => {
    setNotes(e.target.value);
  };

  const saveSession = async () => {
    try {
      const res = await firebase.updateDoc(`sessions/${sessionId}`, {
        ...session,
        liveNotes: notes,
      });
      if (res.status === 'success') {
        console.info(res);
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return sessionLoading ? <Loading /> : (
    <div>
      <Input
        type="longtext"
        value={notes}
        onChange={handleInputChange}
      />
      <ButtonRow align="end">
        <Button small primary onClick={saveSession}>Update</Button>
      </ButtonRow>
    </div>
  );
};

export default LiveNotesEditor;
