import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign } from '../../../../../../../../hooks';
import { ItemList } from '../../../../../../../ui';

const StyledItem = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: max-content 1fr;
    align-items: center;

    & > div {
      padding: ${space.md};
    }
  `;
});
const Avatar = styled.div`
  display: grid;
`;
const Name = styled.div`
  font-weight: bold;
`;
const Description = styled.div(({ theme }) => {
  const { text } = theme;

  return `
    color: ${text.fadedColor};
    font-size: 0.8em;
  `;
});

const Characters = () => {
  const { characters } = useCampaign();

  const listItems = characters.map(({ id, name, classDesc }) => ({
    id,
    content: (
      <StyledItem>
        <Avatar>
          <FaUserCircle style={{ fontSize: '1.5em' }} />
        </Avatar>
        <div>
          <Name>{name}</Name>
          <Description>{classDesc}</Description>
        </div>
      </StyledItem>
    ),
  }));
  
  return (
    <ItemList items={listItems} />
  );
};

export default Characters;
