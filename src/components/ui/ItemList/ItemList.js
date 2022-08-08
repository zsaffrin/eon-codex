import { arrayOf, node, oneOfType, shape, string } from "prop-types";
import styled from 'styled-components';

import { randomCharString } from "../../../utilities";
import ItemListItem from "./ItemListItem";

const StyledList = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.md};
  `;
});

/**
 * Styled item list component
 * 
 * @param {String|ReactElement[]} items Array of list items
 * @param {Boolean} isLinks True to render as Links
 * 
 * @returns {ReactElement} Rendered item list
 */
const ItemList = ({ items, isLinks }) => {
  return (
    <StyledList>
      {items.map(({key, content, to}) => (
        <ItemListItem key={key || randomCharString(5)} isLink={isLinks} to={to}>
          {content}
        </ItemListItem>
      ))}
    </StyledList>
  );
};
ItemList.propTypes = {
  items: arrayOf(shape({
    key: string,
    content: oneOfType([node, string]),
    to: string,
  })),
};
ItemList.defaultProps = {
  items: [],
};

export default ItemList;
