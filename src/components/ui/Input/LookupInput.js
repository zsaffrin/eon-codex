import React from 'react';
import { string } from 'prop-types';

import { sortBy } from '../../../utils';
import { useCollection } from '../../../hooks';
import Loading from '../Loading';
import SelectInput from './SelectInput';

const LookupInput = (props) => {
  const { lookup, lookupDisplayKey, fieldValue } = props;
  const [records, recordsLoading] = useCollection(lookup || ' ');

  const choices = records ? records.reduce((acc, record) => ([
    ...acc,
    {
      itemValue: record.id,
      label: lookupDisplayKey ? record[lookupDisplayKey] : record.name,
    },
  ]), []) : [];

  return recordsLoading ? <Loading /> : (
    <SelectInput choices={sortBy(choices, 'label')} value={fieldValue} {...props} />
  );
};

LookupInput.propTypes = {
  lookup: string,
  lookupDisplayKey: string,
  fieldValue: string,
};
LookupInput.defaultProps = {
  lookup: null,
  lookupDisplayKey: null,
  fieldValue: null,
};

export default LookupInput;
