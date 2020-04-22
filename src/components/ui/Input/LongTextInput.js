import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

const StyledTextarea = styled.textarea(({ height, theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.accent};
    border-radius: 0.25em;
    padding: 0.5em;
    font-size: 0.9em;
    width: 100%;
    min-height: ${height || '20em'};
  `;
});

const LongtextInput = ({
  id, value, onChange, height,
}) => (
  <StyledTextarea
    id={id}
    name={id}
    value={value}
    onChange={(e) => onChange({
      id,
      value: e,
    })}
    height={height || 0}
  />
);
LongtextInput.propTypes = {
  id: string,
  value: string,
  onChange: func,
  height: string,
};
LongtextInput.defaultProps = {
  id: null,
  value: '',
  onChange: () => {},
  height: null,
};

export default LongtextInput;
