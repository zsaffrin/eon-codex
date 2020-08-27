import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { H, Lookup, Markdown } from '../../../../../../ui';
import { PlayerNotes } from '../../../../shared';

const CharacterRecord = ({ record, notes }) => {
  const { player, bio, info } = record;

  return (
    <>
      <p>
        Played by
        {' '}
        <Lookup collection="players" recordId={player} noLink />
      </p>
      {info && (
        <div>
          <H l={2}>Info</H>
          <Markdown content={info} />
          {/* <Notes /> */}
        </div>
      )}
      {bio && (
        <div>
          <H l={2}>Backstory</H>
          <Markdown content={bio} />
        </div>
      )}
      <PlayerNotes
        collection="people"
        article={record.id}
        notes={notes}
      />
    </>
  );
};

CharacterRecord.propTypes = {
  record: shape({
    desc: string,
  }),
  notes: arrayOf(shape({})),
};
CharacterRecord.defaultProps = {
  record: {
    desc: '',
  },
  notes: [],
};

export default CharacterRecord;
