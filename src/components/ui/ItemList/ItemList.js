import { arrayOf, bool, node, oneOfType, shape, string } from 'prop-types';
import styled from 'styled-components';

import { randomCharString } from "../../../utilities";
import SortableItemList from "./SortableItemList";
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
 * @param {Boolean} sortable True to render as sortable list
 * 
 * @returns {ReactElement} Rendered item list
 */
const ItemList = ({ items, isLinks, sortable, sortKey, handleOrderChange }) => {
  if (sortable) {
    return (
      <SortableItemList
        items={items}
        sortKey={sortKey}
        handleOrderChange={handleOrderChange}
      />
    );
  }

  const listItems = items.map(({key, content, to}) => {
    return (
      <ItemListItem key={key || randomCharString(5)} isLink={isLinks} to={to}>
        {content}
      </ItemListItem>
    );
  });
  
  return (
    <StyledList>
      {listItems}
    </StyledList>
  );
};
ItemList.propTypes = {
  items: arrayOf(shape({
    key: string,
    content: oneOfType([node, string]),
    to: string,
  })),
  sortable: bool,
};
ItemList.defaultProps = {
  items: [],
  sortable: false,
};

export default ItemList;
