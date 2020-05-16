import React from 'react';
import { func, shape } from 'prop-types';
import styled from 'styled-components';

import { Button, H } from '../../../../../../ui';

const StyledItem = styled.li(({ theme }) => {
  const { color, space } = theme;
  return `
    border-bottom: 1px solid ${color.accent};
    padding: ${space.md};
    display: grid;
    grid-template-columns: 1fr min-content;
  `;
});

const PCListItem = ({ item, toggleEdit }) => {
  const { name, classDesc, raceDesc } = item;

  return (
    <StyledItem>
      <div>
        <H l={3} compact>{name}</H>
        <div>
          {raceDesc && `${raceDesc} `}
          {classDesc}
        </div>
      </div>
      <div>
        <Button tiny onClick={() => toggleEdit(item)}>Edit</Button>
      </div>
    </StyledItem>
  );
};

PCListItem.propTypes = {
  item: shape({}),
  toggleEdit: func,
};
PCListItem.defaultProps = {
  item: {},
  toggleEdit: () => {},
};

export default PCListItem;
