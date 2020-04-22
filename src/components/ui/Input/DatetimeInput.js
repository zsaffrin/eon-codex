import React from 'react';
import { func, shape, string } from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatetimeInput = ({ id, value, onChange }) => (
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
DatetimeInput.propTypes = {
  id: string,
  value: shape({}),
  onChange: func,
};
DatetimeInput.defaultProps = {
  id: '',
  value: null,
  onChange: () => {},
};

export default DatetimeInput;
