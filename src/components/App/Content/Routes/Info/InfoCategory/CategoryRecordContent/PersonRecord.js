import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { Markdown } from '../../../../../../ui';
import { PlayerNotes } from '../../../../shared';

const PersonRecord = ({ record, notes }) => {
  const { desc } = record;

  return (
    <>
      {desc && <Markdown content={desc} />}
      <PlayerNotes
        collection="people"
        article={record.id}
        notes={notes}
      />
    </>
  );
};

PersonRecord.propTypes = {
  record: shape({
    desc: string,
  }),
  notes: arrayOf(shape({})),
};
PersonRecord.defaultProps = {
  record: {
    desc: '',
  },
  notes: [],
};

export default PersonRecord;
