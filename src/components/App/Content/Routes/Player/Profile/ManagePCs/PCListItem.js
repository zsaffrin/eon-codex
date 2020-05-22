import React from 'react';
import { func, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';

import { Button, H } from '../../../../../../ui';
import PCLootList from './PCLootList';

const StyledItem = styled.li(({ theme }) => {
  const { color, space } = theme;
  return `
    border-bottom: 1px solid ${color.accent};
    padding: ${space.md};
    display: grid;
    grid-template-columns: 1fr min-content;
  `;
});
const ItemContent = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
    padding: ${space.lg};
  `;
});

const PCListItem = ({
  character, loot, sessions, toggleEdit,
}) => {
  const {
    id, name, classDesc, raceDesc,
  } = character;

  const filteredLoot = loot.filter((i) => i.claim === character.id);

  return (
    <StyledItem>
      <div>
        <div>
          <H l={3} compact>{name}</H>
          {raceDesc && `${raceDesc} `}
          {classDesc}
        </div>
        <ItemContent>
          <div>
            <H l={4}>Loot</H>
            <PCLootList pcId={id} loot={filteredLoot} sessions={sessions} />
          </div>
        </ItemContent>
      </div>
      <div>
        <Button tiny onClick={() => toggleEdit(character)}>Edit</Button>
      </div>
    </StyledItem>
  );
};

PCListItem.propTypes = {
  character: shape({}),
  loot: arrayOf(shape({})),
  sessions: arrayOf(shape({})),
  toggleEdit: func,
};
PCListItem.defaultProps = {
  character: {},
  loot: [],
  sessions: [],
  toggleEdit: () => {},
};

export default PCListItem;
