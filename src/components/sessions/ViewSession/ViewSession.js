import React from 'react';
import { useParams } from 'react-router-dom';

import { useDocument } from '../../../hooks/firestoreHooks';
import { Loading } from '../../ui';
import ViewPlannedSession from './ViewPlannedSession';
import ViewPlayedSession from './ViewPlayedSession';
import ViewPlayingSession from './ViewPlayingSession';
import EditSession from './EditSession';

const ViewSession = () => {
  const { sessionId, mode } = useParams();
  const [session, sessionLoading] = useDocument(`sessions/${sessionId}`);

  if (sessionLoading) {
    return <Loading />;
  }

  if (mode === 'edit') {
    return <EditSession />;
  }

  if (session.status === 'planned') {
    return <ViewPlannedSession session={session} />;
  }
  if (session.status === 'played') {
    return <ViewPlayedSession session={session} />;
  }
  if (session.status === 'playing') {
    return <ViewPlayingSession session={session} />;
  }

  return (
    <div>
      {`No view configured for session status "${session.status}"`}
    </div>
  );
};

export default ViewSession;
