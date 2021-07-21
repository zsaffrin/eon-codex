import { formatDate } from '../../../utilities';

const DateCell = ({ fieldValue }) => {
  return (
    <div>
      {fieldValue && formatDate(fieldValue.toDate())}
    </div>
  );
};

export default DateCell;
