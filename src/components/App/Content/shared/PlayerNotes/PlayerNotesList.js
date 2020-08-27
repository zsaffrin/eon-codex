import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { useCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import PlayerNote from './PlayerNote';

const NotesList = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    padding: ${space.md} 0;
  `;
});

const PlayerNotesList = ({ notes }) => {
  const [players, playersLoading] = useCollection('players');

  return playersLoading ? <Loading /> : (
    <NotesList>
      {notes.map(({ content, id, player }) => {
        const playerDetail = players ? players.find((p) => p.id === player) : {};

        return (
          <PlayerNote key={id} noteId={id} note={content} player={playerDetail} />
        );
      })}
    </NotesList>
  );
};

PlayerNotesList.propTypes = {
  notes: arrayOf(shape({})),
};
PlayerNotesList.defaultProps = {
  notes: [],
};

export default PlayerNotesList;
