import styled from 'styled-components';

const StyledRow = styled.div(({ justify, theme, compact }) => {
  const { space } = theme;
  return `
    display: grid;
    align-items: center;
    grid-gap: ${compact ? space.sm : space.md};
    grid-auto-flow: column;
    justify-content: ${justify || 'center'};
    padding: ${compact ? 0 : space.md} ${compact ? space.sm : space.md};
  `;
});

const ButtonRow = ({ children, justify, compact }) => {
  return (
    <StyledRow justify={justify} compact={compact ? 1 : 0}>{children}</StyledRow>
  );
};

export default ButtonRow;
