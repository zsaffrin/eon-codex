import React from 'react';
import { bool, string } from 'prop-types';

import { useDocument } from '../../../hooks';
import Link from '../Link';
import Loading from '../Loading';

const Lookup = ({ collection, recordId, noLink }) => {
  const [record, recordLoading] = useDocument(
    `${collection || ' '}/${recordId || ' '}`,
  );

  if (recordLoading) {
    return <Loading inline />;
  }
  if (noLink) {
    return <span>{record.name}</span>;
  }

  return <Link to={`/${collection}/${recordId}`}>{record.name}</Link>;
};
Lookup.propTypes = {
  collection: string,
  recordId: string,
  noLink: bool,
};
Lookup.defaultProps = {
  collection: null,
  recordId: null,
  noLink: false,
};

export default Lookup;
