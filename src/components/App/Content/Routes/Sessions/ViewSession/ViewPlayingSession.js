import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import {
  Auth, H, Icon, Link, Lookup, Markdown,
} from '../../../../../ui';
import LiveNotesEditor from './LiveNotesEditor';
import SessionLoot from './SessionLoot';
import Participants from './Participants';
import PlaylistShortcuts from './PlaylistShortcuts';

const ViewPlayingSession = ({ session }) => {
  const {
    date, location, liveNotes, meetingUrl, gameUrl, participants,
  } = session;

  return (
    <>
      {/* Summary */}
      <div>
        <div>{`Played: ${date && date.toDate && formatDate(date.toDate())}`}</div>
        <div>
          {'Location: '}
          <Lookup collection="gamingLocations" recordId={location} noLink />
          {location === 'W3Pi4m3LNdcUIi4jL30c' && meetingUrl && (
            <>
              {' - '}
              <Link to={meetingUrl} external>Join Meeting</Link>
              {gameUrl && (
                <>
                  {' - '}
                  <Link to={gameUrl} external>Game Session</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Playlists */}
      {location === 'W3Pi4m3LNdcUIi4jL30c' && (
        <div>
          <H l={2}>
            Playlists
            {' '}
            <Icon name={['fab', 'spotify']} style={{ color: '#1DB954' }} />
          </H>
          <PlaylistShortcuts />
        </div>
      )}

      {/* Participants */}
      <div>
        <H l={2}>Participants</H>
        <Participants sessionParticipants={participants} />
      </div>

      {/* Live Notes */}
      <div>
        <H l={2}>Live Notes</H>
        <Markdown content={liveNotes} />
        <Auth level={3}>
          <LiveNotesEditor liveNotesData={liveNotes} />
        </Auth>

      </div>

      {/* Loot */}
      <div>
        <H l={2}>Loot</H>
        <SessionLoot
          participants={participants}
        />
      </div>
    </>
  );
};
ViewPlayingSession.propTypes = {
  session: shape({
    date: shape({
      toDate: func,
    }),
    location: string,
    liveNotes: string,
  }),
};
ViewPlayingSession.defaultProps = {
  session: {
    date: { toDate: () => {} },
    location: null,
    liveNotes: null,
  },
};
export default ViewPlayingSession;
