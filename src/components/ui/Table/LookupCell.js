import React from 'react';
import { string } from 'prop-types';

import { useDocument } from '../../../hooks';
import Loading from '../Loading';

const LookupCell = ({ fieldValue, lookup }) => {
  const [record, recordLoading] = useDocument(`${lookup || ' '}/${fieldValue || ' '}`);

  return recordLoading ? <Loading /> : (
    <div>
      {record.name}
    </div>
  );
};

LookupCell.propTypes = {
  fieldValue: string,
  lookup: string,
};
LookupCell.defaultProps = {
  fieldValue: ' ',
  lookup: ' ',
};
export default LookupCell;
