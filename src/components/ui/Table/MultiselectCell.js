import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  text-align: center;
`;

const MultiselectCell = ({ fieldValue }) => (
  <StyledCell>
    {fieldValue && Object.keys(fieldValue).length
      ? Object.keys(fieldValue).length
      : 0}
  </StyledCell>
);

export default MultiselectCell;
