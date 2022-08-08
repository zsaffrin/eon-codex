import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";

import ParticipantListItem from './ParticipantListItem';

const StyledList = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.md};
    grid-auto-flow: column;
    grid-auto-columns: 8em;
  `;
});

const ParticipantList = ({ participants }) => {
  return (
    <StyledList>
      {participants.map(p => <ParticipantListItem character={p} key={p.id} />)}
    </StyledList>
  );
};
ParticipantList.propTypes = {
  participants: arrayOf(shape({
    id: string,
    name: string,
  })),
};
ParticipantList.defaultProps = {
  participants: [],
};

export default ParticipantList;
