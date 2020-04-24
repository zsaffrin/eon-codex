import React from 'react';
import { shape } from 'prop-types';
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
MultiselectCell.propTypes = {
  fieldValue: shape({}),
};
MultiselectCell.defaultProps = {
  fieldValue: {},
};

export default MultiselectCell;
