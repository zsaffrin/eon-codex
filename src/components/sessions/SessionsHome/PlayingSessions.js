import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { sortBy } from '../../../utils/dataUtils';
import SessionList from './SessionList/SessionList';

const PlayingSessions = ({ sessions }) => {
  const { color } = useContext(ThemeContext);

  return (
    <div>
      <h2>Sessions In Progress</h2>
      <SessionList
        mainColor={color.primary}
        sessions={sortBy(sessions, 'date')}
      />
    </div>
  );
};

export default PlayingSessions;
