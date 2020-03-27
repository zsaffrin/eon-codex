import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20em;
`;

const LongTextCell = ({ fieldValue }) => <StyledCell>{fieldValue}</StyledCell>;

export default LongTextCell;
