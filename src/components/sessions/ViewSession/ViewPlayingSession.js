import React from 'react';
import { useParams } from 'react-router-dom';

import { useCurrentUser } from '../../../hooks/authHooks';
import { useDocument } from '../../../hooks/firestoreHooks';
import {
  H, Loading, Lookup, Markdown, Page,
} from '../../ui';
import SessionActions from './SessionActions';
import SessionLoot from './SessionLoot';
import LiveNotesEditor from './LiveNotesEditor';

const ViewPlayingSession = () => {
  const { sessionId } = useParams();
  const [user, userLoaded] = useCurrentUser();
  const [session, sessionLoading] = useDocument(`sessions/${sessionId}`);

  const {
    date, liveNotes, location, participants, recap, name,
  } = session || {};

  const players = participants
    ? Object.keys(participants).reduce(
      (acc, key) => (key ? [...acc, key] : acc),
      [],
    )
    : [];

  return sessionLoading ? <Loading /> : (
    <Page>
      <SessionActions sessionId={sessionId} />
      <H l={1}>{name}</H>
      <H l={2}>Session In Progress</H>
      <div>
        Playing at:
        {' '}
        <Lookup collection="gamingLocations" recordId={location} noLink />
      </div>
      {players && (
        <div>
          <h2>Participants</h2>
          <div>
            {players.length > 0
              ? players.map((player) => (
                <div key={player}>
                  <Lookup collection="playerCharacters" recordId={player} />
                </div>
              ))
              : 'None'}
          </div>
        </div>
      )}
      <div>
        <h2>Live Notes</h2>
        <Markdown content={session.liveNotes} />
        {userLoaded && user && user.canEdit && <LiveNotesEditor />}
      </div>
      <div>
        <h2>Loot</h2>
        <SessionLoot />
      </div>
    </Page>
  );
};

export default ViewPlayingSession;
