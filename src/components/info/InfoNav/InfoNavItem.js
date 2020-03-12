import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledItem = styled(Link)(({ active, theme }) => {
  const { color, space } = theme;

  return `
    background: ${active ? color.background : color.primary};
    color: ${active ? color.primary : color.background};
    font-weight: bold;
    padding: ${space.sm};
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      background: ${color.background};
      color: ${color.primary};
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

export default InfoNavItem;
