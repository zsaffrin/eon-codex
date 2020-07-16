import React, { useState } from 'react';
import { func } from 'prop-types';

import { Button } from '../../../../ui';

const PlayerNotesEditor = () => {
  const [addMode, setAddMode] = useState(false);

  const toggleAddMode = () => setAddMode(!addMode);

  return addMode ? (
    <div>
      <Button small onClick={toggleAddMode}>Cancel</Button>
    </div>
  ) : (
    <div>
      <Button small onClick={toggleAddMode}>Add Note</Button>
    </div>
  );
};

PlayerNotesEditor.propTypes = {};
PlayerNotesEditor.defaultProps = {};

export default PlayerNotesEditor;
