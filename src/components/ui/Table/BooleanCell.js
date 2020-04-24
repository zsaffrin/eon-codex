import React from 'react';
import { bool, oneOfType, string } from 'prop-types';
import styled from 'styled-components';

const StyledCell = styled.div`
  text-align: center;
`;

const BooleanCell = ({ fieldValue }) => <StyledCell>{fieldValue && '✓'}</StyledCell>;
BooleanCell.propTypes = {
  fieldValue: oneOfType([bool, string]),
};
BooleanCell.defaultProps = {
  fieldValue: false,
};

export default BooleanCell;
