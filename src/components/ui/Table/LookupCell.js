import { useDocument } from '../../../hooks';
import Loading from '../Loading';

const LookupCell = ({ fieldValue, lookup, lookupDisplayKey }) => {
  const [record, recordLoading] = useDocument(`${lookup || ' '}/${fieldValue || ' '}`);

  if (recordLoading) { return <Loading inline />; }

  return (
    <div>
      {lookupDisplayKey ? record[lookupDisplayKey] : record.name}
    </div>
  );
};

export default LookupCell;
