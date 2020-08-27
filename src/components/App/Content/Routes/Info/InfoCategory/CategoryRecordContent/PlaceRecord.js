import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { Markdown } from '../../../../../../ui';
import { PlayerNotes } from '../../../../shared';

const PlaceRecord = ({ record, notes }) => {
  const { shortDesc, longDesc } = record;

  return (
    <>
      {shortDesc && <Markdown content={shortDesc} />}
      {longDesc && <Markdown content={longDesc} />}
      <PlayerNotes
        collection="places"
        article={record.id}
        notes={notes}
      />
    </>
  );
};

PlaceRecord.propTypes = {
  record: shape({
    desc: string,
  }),
  notes: arrayOf(shape({})),
};
PlaceRecord.defaultProps = {
  record: {
    desc: '',
  },
  notes: [],
};

export default PlaceRecord;
