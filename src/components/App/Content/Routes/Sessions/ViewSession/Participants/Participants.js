import React from 'react';
import { shape } from 'prop-types';

import { useCollection } from '../../../../../../../hooks';
import { Loading } from '../../../../../../ui';
import ParticipantList from './ParticipantList';

const Participants = ({ sessionParticipants }) => {
  const [characterData, characterDataLoading] = useCollection('playerCharacters');

  const participants = sessionParticipants && characterData
    ? Object.keys(sessionParticipants).map((participantId) => (
      characterData.find((character) => character.id === participantId)
    ))
    : [];

  return characterDataLoading
    ? <Loading />
    : <ParticipantList participants={participants} />;
};

Participants.propTypes = {
  sessionParticipants: shape({}),
};
Participants.defaultProps = {
  sessionParticipants: {},
};

export default Participants;
