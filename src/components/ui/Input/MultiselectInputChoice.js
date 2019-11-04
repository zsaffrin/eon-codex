import React from "react";
import styled from "styled-components";

const StyledChoice = styled.div(({ selected, theme }) => {
  const { color, space } = theme;
  return `
    background: ${selected ? color.primary : color.accent};
    padding: ${space.thin};
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
