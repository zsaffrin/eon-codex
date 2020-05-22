import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import PCListItem from './PCListItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PCList = ({ characters, ...rest }) => (
  <StyledList>
    {characters.map((char) => (
      <PCListItem {...rest} character={char} key={char.id} />
    ))}
  </StyledList>
);

PCList.propTypes = {
  characters: arrayOf(shape({})),
};
PCList.defaultProps = {
  characters: [],
};

export default PCList;
