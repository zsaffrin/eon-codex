import React from 'react';
import { shape, string } from 'prop-types';

import { Markdown } from '../../../../../../ui';

const PlaceRecord = ({ record }) => {
  const { shortDesc, longDesc } = record;

  return (
    <>
      {shortDesc && <Markdown content={shortDesc} />}
      {longDesc && <Markdown content={longDesc} />}
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
