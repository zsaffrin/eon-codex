import React from 'react';
import { arrayOf, shape } from 'prop-types';

const PlayerNotesList = ({ notes }) => (
  <div>
    {notes.map(({ id, content }) => <div key={id}>{content}</div>)}
  </div>
);

PlayerNotesList.propTypes = {
  notes: arrayOf(shape({})),
};
PlayerNotesList.defaultProps = {
  notes: [],
};

export default PlayerNotesList;
