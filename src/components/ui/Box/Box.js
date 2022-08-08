import { bool } from 'prop-types';
import styled from 'styled-components';

const StyledBox = styled.div(({ highlighted, muted, theme }) => {
  const { box, layout } = theme;

  let background = box.background;
  if (highlighted) { background = box.highlightedBackground; }
  if (muted) { background = box.mutedBackground; }

  let borderColor = box.borderColor;
  if (highlighted) { borderColor = box.highlightedBorderColor; }
  if (muted) { borderColor = box.mutedBorderColor; }

  return `
    background: ${background};
    border: 1px solid ${borderColor};
    border-radius: ${layout.borderRadius};
    display: grid;
    padding: ${layout.padding};
    grid-gap: ${layout.padding};
    align-content: start;
  `;
});

const Box = ({ highlighted, muted, children }) => {
  return (
    <StyledBox highlighted={highlighted ? 1 : 0} muted={muted ? 1 : 0}>
      {children}
    </StyledBox>
  );
};
Box.propTypes = {
  highlighted: bool,
  muted: bool,
};
Box.defaultProps = {
  highlighted: false,
  muted: false,
};

export default Box;
