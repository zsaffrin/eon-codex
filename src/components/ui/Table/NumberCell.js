import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  text-align: center;
`;

const NumberCell = ({ fieldValue }) => <StyledCell>{fieldValue}</StyledCell>;

export default NumberCell;
