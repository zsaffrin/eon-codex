import { bool, string } from 'prop-types';
import styled from 'styled-components';

import Link from '../Link';

const StyledLinkListItem = styled(Link)(({ theme }) => {
  const { app, layout, space } = theme;

  return `
    background: ${app.backgroundLevel[1]};
    border-radius: ${layout.borderRadius};
    color: inherit;
    display: block;
    padding: ${space.md};
    text-decoration: none;

    &:hover {
      background: ${app.backgroundLevel[2]};
      color: inherit;
      text-decoration: none;
    }
  `;
});
const StyledPlainListItem = styled.div(({ theme }) => {
  const { app, layout, space } = theme;

  return `
    background: ${app.backgroundLevel[1]};
    border-radius: ${layout.borderRadius};
    display: block;
    padding: ${space.md};
  `;
});

const ItemListItem = ({ children, isLink, to }) => {
  return isLink ? (
    <StyledLinkListItem to={to}>
      {children}
    </StyledLinkListItem>
  ) : (
    <StyledPlainListItem>
      {children}
    </StyledPlainListItem>
  );
};
ItemListItem.propTypes = {
  isLink: bool,
  to: string,
};
ItemListItem.defaultProps = {};

export default ItemListItem;
