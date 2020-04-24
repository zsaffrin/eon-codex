import React from 'react';
import { shape, string, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const StyledItem = styled(Link)(({ active, theme }) => {
  const { color, space } = theme;

  return `
    background: ${active ? color.primary : color.secondary};
    color: ${color.background};
    font-weight: bold;
    padding: ${space.sm};
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      background: ${tinycolor(color.primary).darken(10)};
    }
  `;
});

const InfoNavItem = ({ item, active }) => {
  const { name, fieldKey } = item;

  return (
    <StyledItem to={`/info/${fieldKey}`} active={active ? 1 : 0}>
      {name}
    </StyledItem>
  );
};
InfoNavItem.propTypes = {
  item: shape({
    name: string,
    fieldKey: string,
  }),
  active: bool,
};
InfoNavItem.defaultProps = {
  item: {},
  active: false,
};

export default InfoNavItem;
