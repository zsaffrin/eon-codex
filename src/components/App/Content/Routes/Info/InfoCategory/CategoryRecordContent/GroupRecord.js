import React from 'react';
import { shape, string, arrayOf } from 'prop-types';

import { Auth, Markdown } from '../../../../../../ui';
import { PlayerNotes } from '../../../../shared';

const GroupRecord = ({ record, notes }) => {
  const { desc } = record;

  return (
    <>
      {desc && <Markdown content={desc} />}
      <Auth level={1}>
        <PlayerNotes
          collection="groups"
          article={record.id}
          notes={notes}
        />
      </Auth>
    </>
  );
};

GroupRecord.propTypes = {
  record: shape({
    desc: string,
  }),
  notes: arrayOf(shape({})),
};
GroupRecord.defaultProps = {
  record: {
    desc: '',
  },
  notes: [],
};

export default GroupRecord;
