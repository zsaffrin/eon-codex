import styled from 'styled-components';

import CharacterImage from './CharacterImage';

const Tile = styled.div(({ theme }) => {
  const { layout, box, space } = theme;

  return `
    border: 1px solid ${box.borderColor};
    border-radius: ${layout.borderRadius};
    display: grid;
    grid-gap: ${space.md}; 
    padding: ${space.md};
  `;
});
const Name = styled.div`
  font-weight: bold;
  text-align: center;
`;
const Desc = styled.div`
  font-size: 0.8em;
  text-align: center;
`;


const CharacterTile = ({ character }) => {
  const { name, classDesc } = character;

  return (
    <Tile>
      <CharacterImage />
      <div>
        <Name>{name}</Name>
        <Desc>{classDesc}</Desc>
      </div>
    </Tile>
  );
};

export default CharacterTile;
