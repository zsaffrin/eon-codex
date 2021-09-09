import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';
import styled from 'styled-components';

import ItemListItem from './ItemListItem';

const StyledList = styled.ul(({ theme }) => {
  const { space } = theme;

  return `
    list-style: none;
    margin: 0;
    padding: 0;  
    display: grid;
    grid-gap: ${space.md};
  `;
});

const ItemList = ({ items }) => {
  return (
    <StyledList>
      {items.map(({ id, content, url }) => (
        <ItemListItem key={id} url={url}>
          {content}
        </ItemListItem>
      ))}
    </StyledList>
  );
};
ItemList.propTypes = {
  items: arrayOf(shape({
    id: oneOfType([number, string]),
    content: oneOfType([node, string]),
    url: string,
  })),
};
ItemList.defaultProps = {
  items: [],
};

export default ItemList;
