import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import { H, Lookup, Markdown } from '../../../../../ui';
import LiveNotesEditor from './LiveNotesEditor';

const ViewPlayingSession = ({ session }) => {
  const {
    date, location, liveNotes,
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

      {/* Live Notes */}
      <div>
        <H l={2}>Live Notes</H>
        <Markdown content={liveNotes} />
        <LiveNotesEditor liveNotesData={liveNotes} />
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
