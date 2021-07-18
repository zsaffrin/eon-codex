import { useCollection } from '../../../hooks';
import { Loading } from '../../ui';
import { sortBy } from '../../../utilities';
import SelectInput from './SelectInput';

const LookupInput = (props) => {
  const { lookup, lookupDisplayKey, fieldValue } = props;
  const [records, recordsLoading] = useCollection(lookup || ' ');

  if (recordsLoading) { return <Loading inline />; }

  const choices = records ? records.reduce((acc, record) => ([
    ...acc,
    {
      itemValue: record.id,
      label: lookupDisplayKey ? record[lookupDisplayKey] : record.name,
    },
  ]), []) : [];
  
  return (
    <SelectInput choices={sortBy(choices, 'label')} value={fieldValue} {...props} />
  );
};

export default LookupInput;
