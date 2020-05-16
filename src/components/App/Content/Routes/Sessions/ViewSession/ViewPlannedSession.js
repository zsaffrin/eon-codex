import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import { H, Lookup, Markdown } from '../../../../../ui';
import Participants from './Participants';

const ViewPlannedSession = ({ session }) => {
  const {
    date, location, liveNotes, participants,
  } = session;

  return (
    <>
      {/* Summary */}
      <div>
        <div>{`Scheduled For: ${date && date.toDate && formatDate(date.toDate())}`}</div>
        <div>
          {'Location: '}
          {location ? <Lookup collection="gamingLocations" recordId={location} noLink /> : 'TBD'}
        </div>
      </div>

      {/* Participants */}
      <div>
        <H l={2}>Expected Participants</H>
        <Participants sessionParticipants={participants} />
      </div>

      {/* Live Notes */}
      <div>
        <Markdown content={liveNotes} />
      </div>
    </>
  );
};
ViewPlannedSession.propTypes = {
  session: shape({
    date: shape({
      toDate: func,
    }),
    location: string,
    liveNotes: string,
  }),
};
ViewPlannedSession.defaultProps = {
  session: {
    date: { toDate: () => {} },
    location: null,
    liveNotes: null,
  },
};
export default ViewPlannedSession;
