import React from 'react';

import { useDocument } from '../../../hooks/firestoreHooks';
import Loading from '../Loading';

const nullValues = [null, undefined, ''];

const CollectionCell = ({ fieldValue, lookup, lookupArg }) => {
  const [record, recordLoading] = useDocument(
    `${nullValues.includes(lookup) ? ' ' : lookup}/${
      nullValues.includes(fieldValue) ? ' ' : fieldValue
    }`,
  );

  return recordLoading ? <Loading /> : <div>{record && record[lookupArg || 'name']}</div>;
};

export default CollectionCell;
