import React from 'react';
import { shape } from 'prop-types';

const DateCell = ({ fieldValue }) => (
  <div>
    {fieldValue
        && fieldValue.toDate().toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
  </div>
);
DateCell.propTypes = {
  fieldValue: shape({}),
};
DateCell.defaultProps = {
  fieldValue: null,
};

export default DateCell;
