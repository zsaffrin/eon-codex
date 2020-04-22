import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import { H, Lookup, Markdown } from '../../../../../ui';

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
      {liveNotes && (
      <div>
        <H l={2}>Live Notes</H>
        <Markdown content={liveNotes} />
      </div>
      )}
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
