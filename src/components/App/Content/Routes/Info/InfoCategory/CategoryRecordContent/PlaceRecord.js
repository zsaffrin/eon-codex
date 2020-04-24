import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown } from '../../../../../../ui';

const PlaceRecord = ({ record }) => {
  const { desc } = record;

  return (
    <>
      <Markdown content={desc} />
      {/* <Notes /> */}
    </>
  );
};

PlaceRecord.propTypes = {
  record: shape({
    desc: string,
  }),
};
PlaceRecord.defaultProps = {
  record: {
    desc: '',
  },
};

export default PlaceRecord;
