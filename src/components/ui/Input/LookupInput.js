import React from 'react';
import { string } from 'prop-types';

import { sortBy } from '../../../utils';
import { useCollection, useSchema } from '../../../hooks';
import Loading from '../Loading';
import SelectInput from './SelectInput';

const LookupInput = (props) => {
  const { lookup, lookupDisplayKey, fieldValue } = props;
  const [schema, schemaLoading] = useSchema(lookup);
  const [records, recordsLoading] = useCollection(schema && schema.collection ? schema.collection : ' ');

  const choices = records ? records.reduce((acc, record) => ([
    ...acc,
    {
      itemValue: record.id,
      label: lookupDisplayKey ? record[lookupDisplayKey] : record.name,
    },
  ]), []) : [];

  return recordsLoading || schemaLoading ? <Loading /> : (
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
