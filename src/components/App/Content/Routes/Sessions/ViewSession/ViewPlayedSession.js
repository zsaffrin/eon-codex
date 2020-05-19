import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import {
  H, Lookup, Markdown,
} from '../../../../../ui';
import Participants from './Participants';
import SessionLoot from './SessionLoot';

const ViewPlayedSession = ({ session }) => {
  const {
    date, location, recap, liveNotes, participants,
  } = session;

  return (
    <>
      {/* Summary */}
      <div>
        <div>{`Played: ${date && date.toDate && formatDate(date.toDate())}`}</div>
        <div>
          {'Location: '}
          <Lookup collection="gamingLocations" recordId={location} noLink />
        </div>
      </div>

      {/* Participants */}
      <div>
        <H l={2}>Participants</H>
        <Participants sessionParticipants={participants} />
      </div>

      {/* Recap */}
      {recap && (
      <div>
        <H l={2}>Recap</H>
        <Markdown content={recap} />
      </div>
      )}

      {/* Live Notes */}
      {liveNotes && (
      <div>
        <H l={2}>Live Notes</H>
        <Markdown content={liveNotes} />
      </div>
      )}

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
ViewPlayedSession.propTypes = {
  session: shape({
    date: shape({
      toDate: func,
    }),
    location: string,
    recap: string,
    liveNotes: string,
  }),
};
ViewPlayedSession.defaultProps = {
  session: {
    date: { toDate: () => {} },
    location: null,
    recap: null,
    liveNotes: null,
  },
};

export default ViewPlayedSession;
