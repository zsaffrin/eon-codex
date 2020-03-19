import React from 'react';
import styled from 'styled-components';
import {
  arrayOf, string, oneOfType, node,
} from 'prop-types';

const Row = styled.div(({ align, items, theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: repeat(${items}, auto);
    grid-gap: ${space.sm};
    justify-content: ${align || 'auto'};
    padding: ${space.md} 0;
  `;
});

const ButtonRow = ({ align, children }) => (
  <Row align={align} items={children.length}>{children}</Row>
);
ButtonRow.propTypes = {
  align: string,
  children: oneOfType([arrayOf(node), node]),
};
ButtonRow.defaultProps = {
  align: '',
  children: [],
};

export default ButtonRow;
