import { Navigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';

import { useCampaign, useToggledModal } from "../../../../../../hooks";
import { Box, Button, ButtonRow, HeaderRow, Link, Page, PageHeader, VerticalList } from '../../../../../ui';
import EditCharacter from './EditCharacter';

const StyledSubtitle = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-gap: ${space.sm};
  `;
});

const Character = () => {
  const { characterId } = useParams();
  const { key: campaignKey, characters } = useCampaign();
  const [editModal, toggleEditModal] = useToggledModal(EditCharacter);

  const character = characters.find(({ id }) => characterId === id);

  if (!characterId || !character) {
    return <Navigate to={`/campaign/${campaignKey}/players`} />;
  }

  const subtitleContent = (
    <StyledSubtitle>
      <span>Played by</span>
      <Link to={`/campaign/${campaignKey}/player/${character.player}`}>
        {character.playerName}
      </Link>
    </StyledSubtitle>
  );

  const detailFields = [
    {
      label: 'Level',
      content: character.level,
    },
    {
      label: 'Race',
      content: character.race,
    },
    {
      label: 'Class',
      content: character.classDesc,
    },
  ];

  return (
    <Page>
      {editModal}
      <PageHeader
        title={character.name}
        subtitle={subtitleContent}
        campaignKey={campaignKey}
        breadcrumbs={[{
          label: 'Characters',
          target: `/campaign/${campaignKey}/characters`,
        }]}
        content={(
          <ButtonRow>
            <Button
              small
              icon={<FaEdit />}
              label="Edit"
              onClick={() => toggleEditModal(character)}
            />
          </ButtonRow>
        )}
      />
      <Box>
        <VerticalList items={detailFields} />
      </Box>
      <Box>
        <HeaderRow title="Description" />
        <div>{character.description}</div>
      </Box>
      <Box>
        <HeaderRow title="Backstory" />
        <div>{character.backstory}</div>
      </Box>
    </Page>
  );
};

export default Character;
