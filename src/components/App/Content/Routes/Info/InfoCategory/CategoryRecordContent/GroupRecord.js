import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown } from '../../../../../../ui';

const GroupRecord = ({ record }) => {
  const { desc } = record;

  return (
    <>
      {desc && <Markdown content={desc} />}
      {/* <Notes /> */}
    </>
  );
};

GroupRecord.propTypes = {
  record: shape({
    desc: string,
  }),
};
GroupRecord.defaultProps = {
  record: {
    desc: '',
  },
};

export default GroupRecord;
