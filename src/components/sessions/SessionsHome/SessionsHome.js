import React from 'react';

import { useCollection } from '../../../hooks/firestoreHooks';
import { Breadcrumb, Loading, Page } from '../../ui';
import PlayedSessions from './PlayedSessions';
import PlannedSessions from './PlannedSessions';
import PlayingSessions from './PlayingSessions';

const SessionsHome = () => {
  const [collection, collectionLoading] = useCollection('sessions');

  const sessions = collection
    ? collection.reduce(
      (acc, session) => {
        if (!acc[session.status]) {
          acc[session.status] = [];
        }
        acc[session.status].push(session);

        return acc;
      },
      { planned: [], played: [], playing: [] },
    ) : [];

  return collectionLoading ? (
    <Loading />
  ) : (
    <Page>
      <Breadcrumb links={[{ label: 'Home', target: '/' }]} />
      <h1>Sessions</h1>
      {sessions.playing.length > 0 && (
        <PlayingSessions sessions={sessions.playing} />
      )}
      {sessions.planned.length > 0 && (
        <PlannedSessions sessions={sessions.planned} />
      )}
      {sessions.played.length > 0 && (
        <PlayedSessions sessions={sessions.played} />
      )}
    </Page>
  );
};

export default SessionsHome;
