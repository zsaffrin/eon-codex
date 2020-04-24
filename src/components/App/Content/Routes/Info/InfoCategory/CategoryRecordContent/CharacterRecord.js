import React from 'react';
import { shape, string } from 'prop-types';

import { H, Lookup, Markdown } from '../../../../../../ui';

const CharacterRecord = ({ record }) => {
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
    </>
  );
};

CharacterRecord.propTypes = {
  record: shape({
    desc: string,
  }),
};
CharacterRecord.defaultProps = {
  record: {
    desc: '',
  },
};

export default CharacterRecord;
