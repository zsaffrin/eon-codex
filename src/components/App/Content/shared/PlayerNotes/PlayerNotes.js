import React from 'react';
import { string } from 'prop-types';

import { sortBy } from '../../../../../utils';
import { useCollection } from '../../../../../hooks';
import { H, Loading } from '../../../../ui';
import PlayerNotesList from './PlayerNotesList';
import PlayerNotesEditor from './PlayerNotesEditor';

const PlayerNotes = ({ article, collection }) => {
  const [notes, notesLoading] = useCollection('notes', ['collection', '==', collection || ' ']);
  const articleNotes = notes ? notes.filter((note) => note.article === article) : [];

  return notesLoading ? <Loading /> : (
    <div>
      <H l={3} compact>Player Notes</H>
      <PlayerNotesList notes={sortBy(articleNotes, 'created')} />
      <PlayerNotesEditor article={article} collection={collection} />
    </div>
  );
};

PlayerNotes.propTypes = {
  collection: string,
  article: string,
};
PlayerNotes.defaultProps = {
  collection: null,
  article: null,
};

export default PlayerNotes;
