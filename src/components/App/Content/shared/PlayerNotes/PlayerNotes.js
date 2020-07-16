import React from 'react';
import { string } from 'prop-types';

import { useCollection } from '../../../../../hooks';
import { Loading } from '../../../../ui';
import PlayerNotesList from './PlayerNotesList';
import PlayerNotesEditor from './PlayerNotesEditor';

const PlayerNotes = ({ article, collection }) => {
  const [notes, notesLoading] = useCollection('notes', ['collection', '==', collection || ' ']);
  const articleNotes = notes ? notes.filter((note) => note.article === article) : [];

  return notesLoading ? <Loading /> : (
    <div>
      <PlayerNotesList notes={articleNotes} />
      <PlayerNotesEditor />
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
