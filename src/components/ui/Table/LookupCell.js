import React from 'react';
import { string } from 'prop-types';

import { useSchema, useDocument } from '../../../hooks';
import Loading from '../Loading';

const LookupCell = ({ fieldValue, lookup }) => {
  const [schema] = useSchema(lookup);
  const [record, recordLoading] = useDocument(`${schema && schema.collection ? schema.collection : ' '}/${fieldValue || ' '}`);

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
