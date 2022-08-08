import { node, number, string } from 'prop-types';
import styled from 'styled-components';

import { H } from '..';

const StyledRow = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.lg};
    grid-template-columns: 1fr max-content;
    align-items: center;
  `;
});

/**
 * 
 * @param {string|ReactElement} title Heading text to display
 * @param {ReactElement} content Optional block of content to render on the right
 * @param {number} h Heading size to display - 1-6 = h1-h6. 2 is default
 * @returns {ReactElement} Rendered styled row node
 */
const HeaderRow = ({ content, title, h }) => {
  return (
    <StyledRow>
      <H l={h} compact>{title}</H>
      {content}
    </StyledRow>
  );
};
HeaderRow.propTypes = {
  content: node,
  h: number,
  title: string,
};
HeaderRow.defaultProps = {
  h: 2,
};

export default HeaderRow;
