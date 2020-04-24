import React from 'react';
import { func, shape, string } from 'prop-types';

import { formatDate } from '../../../../../../utils';
import { Lookup, Markdown } from '../../../../../ui';

const ViewPlannedSession = ({ session }) => {
  const {
    date, location, liveNotes,
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
