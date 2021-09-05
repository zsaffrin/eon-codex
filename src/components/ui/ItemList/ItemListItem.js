import styled from 'styled-components';

const StyledItem = styled.li(({ theme, withHover }) => {
  const { itemList, layout } = theme;

  return `
    border-radius: ${layout.borderRadius};

    &:hover {
      background: ${withHover ? itemList.hoverBg : 'inherit'};
    }
  `;
});

const ItemListItem = ({ children, withHover }) => {
  return (
    <StyledItem withHover={withHover ? 1 : 0}>
      {children}
    </StyledItem>
  );
};

export default ItemListItem;
