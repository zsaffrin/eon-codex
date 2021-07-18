import styled from 'styled-components';

const StyledList = styled.div(({ theme }) => {
  const { layout } = theme;
  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});
const StyledLabel = styled.label(({ theme }) => {
  const { input } = theme;
  return `
    color: ${input.labelColor};
    font-size: 0.85rem;
    font-weight: bold;
  `;
});

const StackedList = ({ items = [] }) => {
  const listItems = items.map(({ label, content }) => (
    <div key={label}>
      <StyledLabel key={`${label}-label`}>{label}</StyledLabel>
      <div key={`${label}-content`}>{content}</div>
    </div>
  ));
  
  return (
    <StyledList>
      {listItems}
    </StyledList>
  );
};

export default StackedList;
