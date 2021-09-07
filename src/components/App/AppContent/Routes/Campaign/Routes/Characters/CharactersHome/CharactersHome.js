import { Link as rrLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign, useToggle } from '../../../../../../../../hooks';
import { Box, Breadcrumb, ButtonRow, Button, H, ItemList, Modal, TitleRow, Link, Page } from '../../../../../../../ui';
import AddCharacter from '../AddCharacter';

const StyledItem = styled(rrLink)(({ theme }) => {
  const { itemList, layout, space } = theme;

  return `
    align-items: center;
    border-radius: ${layout.borderRadius};
    color: inherit;
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: max-content 1fr;
    text-decoration: inherit;

    &:hover {
      background: ${itemList.hoverBg};
    }

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

const CharactersHome = () => {
  const { key: campaignKey, characters } = useCampaign();
  const [isAdding, setIsAdding] = useToggle();

  const listItems = characters.map(({ id, level, name, classDesc, race }) => ({
    id,
    content: (
      <StyledItem to={`/campaign/${campaignKey}/characters/${id}`}>
        <Avatar>
          <FaUserCircle style={{ fontSize: '1.5em' }} />
        </Avatar>
        <div>
          <Name>{name}</Name>
          <Description>
            {`${level && `Level ${level}`}${race && ` ${race}`}${classDesc && ` ${classDesc}`}`}
          </Description>
        </div>
      </StyledItem>
    ),
  }));

  return (
    <Page>
      {isAdding && (
        <Modal>
          <AddCharacter close={setIsAdding} />
        </Modal>
      )}
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to={`/campaign/${campaignKey}`}>
              <AiFillHome />
            </Link>,
            'Characters'
          ]} />
          <H l={1} compact>Characters</H>
        </div>
        <ButtonRow compact>
          <Button onClick={setIsAdding}>New</Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        <ItemList items={listItems} />
      </Box>
    </Page>
  );
};

export default CharactersHome;
