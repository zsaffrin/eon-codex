import React from 'react';

import { sortBy } from '../../../../../utils';
import { useCollection } from '../../../../../hooks';
import { H, Loading, Page } from '../../../../ui';

const Sessions = () => {
  const [sessions, sessionsLoading] = useCollection('sessions');

  return sessionsLoading ? <Loading /> : (
    <Page>
      <H l={1}>Sessions</H>
      <ul>
        {sortBy(sessions, 'date', 'desc').map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </Page>
  );
};

export default Sessions;
