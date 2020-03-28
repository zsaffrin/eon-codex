import React from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonRow, Button } from '../../ui';

const SessionActions = ({ sessionId }) => {
  const history = useHistory();

  return (
    <ButtonRow align="end">
      <Button small onClick={() => history.push(`/sessions/${sessionId}/edit`)}>Edit Session</Button>
    </ButtonRow>
  );
};

export default SessionActions;
