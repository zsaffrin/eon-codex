import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { nextItem, prevItem } from '../../../../../../../utils';
import { Icon, Link } from '../../../../../../ui';

const StyledNav = styled.div`
  display: flex;
  font-size: 0.8rem;
  justify-content: space-between;
`;

const SessionNav = ({ sessions, currentSession }) => {
  const nextSession = nextItem(sessions, currentSession);
  const prevSession = prevItem(sessions, currentSession);

  return (
    <StyledNav>
      <div>
        {prevSession && (
        <Link to={`/sessions/${prevSession.id}`}>
          <Icon name="chevron-left" />
          {` ${prevSession.sessionNumber}: ${prevSession.name}`}
        </Link>
        )}
      </div>
      <div>
        {nextSession && (
        <Link to={`/sessions/${nextSession.id}`}>
          {`${nextSession.sessionNumber}: ${nextSession.name} `}
          <Icon name="chevron-right" />
        </Link>
        )}
      </div>
    </StyledNav>
  );
};

SessionNav.propTypes = {
  sessions: arrayOf(shape({})),
  currentSession: shape({}),
};
SessionNav.defaultProps = {
  sessions: [],
  currentSession: {},
};

export default SessionNav;
