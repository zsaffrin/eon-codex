import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown } from '../../../../../../ui';

const PersonRecord = ({ record }) => {
  const { desc } = record;

  return (
    <>
      {desc && <Markdown content={desc} />}
      {/* <Notes /> */}
    </>
  );
};

PersonRecord.propTypes = {
  record: shape({
    desc: string,
  }),
};
PersonRecord.defaultProps = {
  record: {
    desc: '',
  },
};

export default PersonRecord;
