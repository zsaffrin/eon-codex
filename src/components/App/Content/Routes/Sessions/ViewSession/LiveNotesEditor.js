import React, { useState } from 'react';
import { string } from 'prop-types';
import { useParams } from 'react-router-dom';

import { useFirebase } from '../../../../../../hooks';
import { ButtonRow, Button, Input } from '../../../../../ui';

const LiveNotesEditor = ({ liveNotesData }) => {
  const { sessionId } = useParams();
  const [liveNotes, setLiveNotes] = useState(liveNotesData || '');
  const firebase = useFirebase();

  const handleInputChange = ({ value }) => {
    setLiveNotes(value);
  };

  const saveLiveNotes = async () => {
    try {
      const res = await firebase.updateDoc(`sessions/${sessionId}`, {
        liveNotes,
      });
      if (res.status === 'success') { console.info(res); }
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <Input
        type="EpX4vmYkb5yrNBCvrw4H"
        value={liveNotes}
        onChange={handleInputChange}
      />
      <ButtonRow align="end">
        <Button small primary onClick={saveLiveNotes}>Update</Button>
      </ButtonRow>
    </div>
  );
};

LiveNotesEditor.propTypes = {
  liveNotesData: string,
};
LiveNotesEditor.defaultProps = {
  liveNotesData: null,
};

export default LiveNotesEditor;
