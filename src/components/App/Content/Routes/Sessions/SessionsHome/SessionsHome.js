import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { sortBy } from '../../../../../../utils';
import { H, Page } from '../../../../../ui';
import SessionListItem from './SessionListItem';

const SessionsList = styled.ul(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
    list-style: none;
    margin: 0;
    padding: 0;
  `;
});

const SessionsHome = ({ sessions }) => (
  <Page>
    <H l={1}>Sessions</H>
    <SessionsList>
      {sortBy(sessions, 'date', 'desc').map((session) => (
        <SessionListItem
          key={session.id}
          sessionData={session}
        />
      ))}
    </SessionsList>
  </Page>
);
SessionsHome.propTypes = {
  sessions: arrayOf(shape({})),
};
SessionsHome.defaultProps = {
  sessions: [],
};

export default SessionsHome;
