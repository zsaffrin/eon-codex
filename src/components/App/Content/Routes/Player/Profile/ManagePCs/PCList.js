import React from 'react';
import { arrayOf, func, shape } from 'prop-types';
import styled from 'styled-components';

import PCListItem from './PCListItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PCList = ({ items, toggleEdit }) => (
  <StyledList>
    {items.map((item) => (
      <PCListItem key={item.id} item={item} toggleEdit={toggleEdit} />
    ))}
  </StyledList>
);
PCList.propTypes = {
  items: arrayOf(shape({})),
  toggleEdit: func,
};
PCList.defaultProps = {
  items: [],
  toggleEdit: () => {},
};

export default PCList;
