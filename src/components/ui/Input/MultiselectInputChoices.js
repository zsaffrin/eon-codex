import { arrayOf, func, shape, string } from 'prop-types';
import styled from 'styled-components';

const StyledChoices = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.sm};
  `;
});
const StyledChoiceItem = styled.div(({ active, theme }) => {
  const { borders, color, layout, space } = theme;

  return `
    background: ${active ? color.primary : 'inherit'};
    border: 1px solid ${borders.color};
    border-radius: ${layout.borderRadius};
    padding: ${space.sm};
  `;
});

const MultiselectInputChoices = ({ choices, selections, toggleSelection }) => {
  const choiceItems = choices.map(({ id, name }) => (
    <StyledChoiceItem 
      key={id} 
      active={selections.includes(id) ? 1 : 0}
      onClick={() => toggleSelection(id)}
    >
      {name}
    </StyledChoiceItem>
  ));

  return (
    <StyledChoices>
      {choiceItems}
    </StyledChoices>
  );
};
MultiselectInputChoices.propTypes = {
  choices: arrayOf(shape({
    id: string,
    name: string,
  })),
  selections: arrayOf(string),
  toggleSelection: func,
};
MultiselectInputChoices.defaultProps = {
  choices: [],
  selections: [],
  toggleSelection: () => {},
};

export default MultiselectInputChoices;
