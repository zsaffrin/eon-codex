import { arrayOf, node, oneOfType, shape, string } from 'prop-types';
import styled from 'styled-components';

const StyledRows = styled.div(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: ${layout.padding};
  `;
});
const StyledLabel = styled.label(({ isString, theme }) => {
  const { space } = theme;

  return `
    ${isString ? 'font-weight: bold;' : ''}
    padding: ${space.sm};
    max-width: 10rem;
  `;
});
const StyledContent = styled.div`
  display: grid;
  align-items: center;
`;
const FullRow = styled.div`
  grid-column: 1 / -1;
`;

/**
 * Vertical List component
 * 
 * @param {Object[]} items Array of list row items
 * @param {String|ReactElement} items[].label The content to display in the Label cell
 * @param {String|ReactElement} items[].content The content to display in the Content cell
 * @param {Boolean} items[].fullRow True to render only Content in full width
 * 
 * @returns {ReactElement} Rendered vertical list
 */
const VerticalList = ({ items }) => {
  const rows = [];
  for (const itemIndex in items) {
    const { id, fullRow, label, content } = items[itemIndex];
    fullRow 
      ? rows.push(
        <FullRow
          key={`${id || itemIndex}-content`}
        >
          {content}
        </FullRow>
      ) 
      : rows.push(
        <StyledLabel
          key={`${id || itemIndex}-label`}
          htmlFor={id}
          isString={typeof label === 'string' ? 1 : 0}
        >
          {label}
        </StyledLabel>,
        <StyledContent key={`${id || itemIndex}-content`}>{content}</StyledContent>
      );
  }
  
  return (
    <StyledRows>
      {rows}
    </StyledRows>
  );
};
VerticalList.propTypes = {
  items: arrayOf(shape({
    label: oneOfType([node, string]),
    content: oneOfType([node, string]),
  })),
};
VerticalList.defaultProps = {
  items: [],
};

export default VerticalList;
