import styled from 'styled-components';

const StyledItem = styled.li(({ theme }) => {
  const { itemList, layout } = theme;

  return `
    border-radius: ${layout.borderRadius};

    &:hover {
      background: ${itemList.hoverBg};
    }
  `;
});

const ItemListItem = ({ children }) => {
  return (
    <StyledItem>
      {children}
    </StyledItem>
  );
};

export default ItemListItem;
