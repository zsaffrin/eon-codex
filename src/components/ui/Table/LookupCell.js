import { useDocument } from '../../../hooks';
import Loading from '../Loading';

const LookupCell = ({ fieldValue, lookup }) => {
  const [record, recordLoading] = useDocument(`${lookup || ' '}/${fieldValue || ' '}`);

  if (recordLoading) { return <Loading inline />; }

  return (
    <div>
      {record.name}
    </div>
  );
};

export default LookupCell;
