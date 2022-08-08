import { bool, string } from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div(({ compact, justify, theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-auto-flow: column;
    grid-gap: ${space.md};
    justify-content: ${justify || 'center'};
    padding: ${compact ? 0 : space.sm};
  `;
});

const ButtonRow = ({ children, compact, justify }) => {
  return (
    <StyledDiv compact={compact ? 1 : 0} justify={justify}>
      {children}
    </StyledDiv>
  );
};
ButtonRow.propTypes = {
  compact: bool,
  justify: string,
};
ButtonRow.defaultProps = {};

export default ButtonRow;
