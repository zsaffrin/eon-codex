import React from 'react';
import { shape } from 'prop-types';

import { formatDate } from '../../../utils';

const DateCell = ({ fieldValue }) => (
  <div>
    {fieldValue && formatDate(fieldValue.toDate())}
  </div>
);
DateCell.propTypes = {
  fieldValue: shape({}),
};
DateCell.defaultProps = {
  fieldValue: null,
};

export default DateCell;
