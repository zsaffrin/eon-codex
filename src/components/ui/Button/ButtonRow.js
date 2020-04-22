import React from 'react';
import styled from 'styled-components';
import {
  arrayOf, bool, string, oneOfType, node,
} from 'prop-types';

const Row = styled.div(({
  align, compact, items, theme,
}) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: repeat(${items}, auto);
    grid-gap: ${space.sm};
    justify-content: ${align || 'auto'};
    padding: ${compact ? space.thin : space.md} 0;
  `;
});

const ButtonRow = ({ align, children, compact }) => (
  <Row align={align} compact={compact ? 1 : 0} items={children.length}>{children}</Row>
);
ButtonRow.propTypes = {
  align: string,
  children: oneOfType([arrayOf(node), node]),
  compact: bool,
};
ButtonRow.defaultProps = {
  align: '',
  children: [],
  compact: false,
};

export default ButtonRow;
