import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ id, value, onChange }) => {
  return (
    <DatePicker
      id={id}
      selected={value && value.toDate ? value.toDate() : value}
      dateFormat="MMMM d, yyyy"
      onChange={(e) => onChange({
        id,
        value: e,
      })}
    />
  );
};

export default DateInput;
