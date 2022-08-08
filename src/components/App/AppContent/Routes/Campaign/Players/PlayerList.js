import { arrayOf, shape } from "prop-types";
import styled from 'styled-components';

import PlayerListItem from './PlayerListItem';

const StyledList = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.md}; 
  `;
});

const PlayerList = ({ players }) => {
  return (
    <StyledList>
      {players.map(player => (
        <PlayerListItem key={player.id} player={player} />
      ))}
    </StyledList>
  );
};
PlayerList.propTypes = {
  players: arrayOf(shape({})),
};
PlayerList.defaultProps = {
  players: [],
};

export default PlayerList;
