import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { string } from 'prop-types';

const StyledItem = styled(Link)(({ active, theme }) => {
  const { color, space } = theme;
  return `
    background: ${active ? color.primary : 'inherit'}
    color: ${active ? color.background : 'inherit'}
    display: block;
    padding: ${space.thin} ${space.md};
    text-decoration: none;
    &:hover {
      background: ${color.primary};
      color: ${color.background};
    }
  `;
});

const RecordListItem = ({ id, label }) => {
  const { collectionId, recordId } = useParams();

  return (
    <StyledItem to={`/info/${collectionId}/${id}`} active={id === recordId ? 1 : 0}>
      {label}
    </StyledItem>
  );
};
RecordListItem.propTypes = {
  id: string,
  label: string,
};
RecordListItem.defaultProps = {
  id: null,
  label: null,
};

export default RecordListItem;
