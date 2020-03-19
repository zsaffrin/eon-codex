import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBar = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-auto-flow: column;
    justify-items: center;
    font-size: 0.8em;
    padding: ${space.sm};
    text-transform: uppercase;
  `;
});

const ActionBar = () => {
  const { categoryId, recordId } = useParams();

  return (
    <StyledBar>
      <Link to={`/info/${categoryId}/_/add`}>New</Link>
      {recordId && <Link to={`/info/${categoryId}/${recordId}/edit`}>Edit</Link>}
    </StyledBar>
  );
};

export default ActionBar;
