import React from 'react';
import { Link } from 'react-router-dom';
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

const RecordListItem = ({
  label, collectionId, recordId, active,
}) => (
  <StyledItem to={`/info/${collectionId}/${recordId}`} active={active ? 1 : 0}>
    {label}
  </StyledItem>
);
RecordListItem.propTypes = {
  label: string,
  collectionId: string,
  recordId: string,
};
RecordListItem.defaultProps = {
  label: '',
  collectionId: '',
  recordId: '',
};

export default RecordListItem;
