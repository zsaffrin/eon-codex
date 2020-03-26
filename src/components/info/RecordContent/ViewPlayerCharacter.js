import React from 'react';
import { shape, string } from 'prop-types';

import {
  Lookup, Markdown, Notes, Page,
} from '../../ui';

const ViewPlayerCharacter = ({ record }) => {
  const {
    name, player, bio, info,
  } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <p>
        Played by
        {' '}
        <Lookup collection="players" recordId={player} noLink />
      </p>
      {info && (
        <div>
          <h2>Info</h2>
          <Markdown content={info} />
          <Notes />
        </div>
      )}
      {bio && (
        <div>
          <h2>Backstory</h2>
          <Markdown content={bio} />
        </div>
      )}
    </Page>
  );
};
ViewPlayerCharacter.propTypes = {
  record: shape({
    name: string,
    player: string,
    bio: string,
    info: string,
  }),
};
ViewPlayerCharacter.defaultProps = {
  record: {
    name: '',
    player: '',
    bio: '',
    info: '',
  },
};

export default ViewPlayerCharacter;
