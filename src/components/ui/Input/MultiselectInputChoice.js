import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const StyledChoice = styled.div(({ selected, theme }) => {
  const { color, space } = theme;

  const backgroundColor = selected ? color.primary : color.accent;
  const textColor = tinycolor(backgroundColor).isLight()
    ? color.black
    : color.white;

  return `
    background: ${selected ? color.primary : color.accent};
    color: ${textColor};
    cursor: pointer;
    padding: ${space.sm};
  `;
});

const MultiselectInputChoice = ({ choice, selected, onChange }) => {
  return (
    <StyledChoice selected={selected} onClick={() => onChange(choice.id)}>
      {choice.name}
    </StyledChoice>
  );
};

export default MultiselectInputChoice;
