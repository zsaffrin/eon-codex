import { Link as rrLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(rrLink)(({ theme }) => {
  const { itemList, layout } = theme;

  return `
    border-radius: ${layout.borderRadius};
    color: inherit;
    text-decoration: inherit;

    &:hover {
      background: ${itemList.hoverBg};
    }
  `;
});

const StyledItem = styled.li(({ theme }) => {
  const { layout } = theme;

  return `
    border-radius: ${layout.borderRadius};
  `;
});

const ItemListItem = ({ children, url }) => {
  //TODO: An li should be rendered regardless of url
  return url
    ? (
      <StyledLink to={url}>
        {children}
      </StyledLink>
    )
    : (
      <StyledItem>
        {children}
      </StyledItem>
    );
};

export default ItemListItem;
