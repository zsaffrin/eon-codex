import React from 'react';
import { arrayOf, shape } from 'prop-types';

const ParticipantList = ({ participants }) => (
  participants.length > 0
    ? (
      <ul>
        {participants.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    )
    : (
      <div>None yet</div>
    )
);

ParticipantList.propTypes = {
  participants: arrayOf(shape({})),
};
ParticipantList.defaultProps = {
  participants: [],
};

export default ParticipantList;
