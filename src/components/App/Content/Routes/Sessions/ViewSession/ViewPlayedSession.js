import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import {
  H, Lookup, Markdown,
} from '../../../../../ui';

const ViewPlayedSession = ({ session }) => {
  const {
    date, location, recap, liveNotes,
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
