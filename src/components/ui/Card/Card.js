import React from 'react';
import {
  arrayOf, bool, node, oneOfType, string,
} from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const StyledCard = styled.div(({ color, hoverColor, shadow }) => `
  border: ${color ? `1px solid ${color}` : 'none'};
  box-shadow: ${shadow ? (
    `0 10px 20px ${tinycolor.mix(color || '#000', '#000').setAlpha(0.19).toRgbString()}, 
      0 6px 6px ${tinycolor.mix(color || '#000', '#000').setAlpha(0.23).toRgbString()}`
  ) : 'none'};
  ${hoverColor && `
    &:hover {
      border-color: ${hoverColor};
    }
  `}
  `);

const Card = ({
  children, color, hoverColor, noShadow,
}) => (
  <StyledCard color={color} hoverColor={hoverColor} shadow={noShadow ? 0 : 1}>
    {children}
  </StyledCard>
);
Card.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  color: string,
  hoverColor: string,
  noShadow: bool,
};
Card.defaultProps = {
  children: [],
  color: null,
  hoverColor: null,
  noShadow: false,
};

export default Card;
