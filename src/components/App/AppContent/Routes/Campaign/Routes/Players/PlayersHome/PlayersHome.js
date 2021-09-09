import { AiFillHome } from 'react-icons/ai';
import styled from 'styled-components';

import { useCampaign } from '../../../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, ItemList, Link, Page, TitleRow } from '../../../../../../../ui';

const StyledItem = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-auto-flow: column;
  
    & > * {
      padding: ${space.md};
    }
  `;
});

const PlayersHome = () => {
  const { key: campaignKey, characters, players } = useCampaign();

  const listItems = players.map(({ id, name }) => {
    const playerCharacters = characters.filter(({ player }) => player === id);

    return ({
      id,
      url: `/campaign/${campaignKey}/players/${id}`,
      content: (
        <StyledItem>
          <H l={2} compact>{name}</H>
          <div>{playerCharacters.map(({ name }) => name)}</div>
        </StyledItem>
      )
    });
  });

  return (
    <Page>
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to={`/campaign/${campaignKey}`}>
              <AiFillHome />
            </Link>,
            'Players'
          ]} />
          <H l={1} compact>Players</H>
        </div>
        <ButtonRow compact>
          <Button>Invite Player</Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        <ItemList items={listItems} />
      </Box>
    </Page>
  );
};

export default PlayersHome;
