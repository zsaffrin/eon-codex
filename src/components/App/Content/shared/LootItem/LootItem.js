import React, { useContext, useState } from 'react';
import { shape } from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

import {
  Auth, Button, Card, Icon, Link, Modal,
} from '../../../../ui';
import EditRecord from '../record/EditRecord';

const StyledLootItem = styled.div(({ itemColor, claimed, theme }) => {
  const { color, space } = theme;

  return `
    color: ${claimed ? itemColor : 'inherit'};
    padding: ${space.sm};

    ${claimed && `
      &:hover {
        border-color: ${color.darkgray};
        color: inherit;
      }
    `}
    `;
});
const Row = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: auto 1fr;

    & > div {
      padding: ${space.sm};
    }
  `;
});
const TitleRow = styled(Row)(({
  itemColor, claimed, theme,
}) => {
  const { color, text } = theme;

  return `
    color: ${itemColor};
    
    .itemLink {
      color: ${itemColor};
    }

    ${claimed && `
      ${StyledLootItem}:hover & {
        color: ${color.darkgray};

        .itemLink {
          color: ${text.linkColor};
          &:hover {
            text-decoration: underline;
          }
        }
      }

    `}
  `;
});
const Title = styled.div`
  font-weight: bold;
`;
const Detail = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    font-size: 0.85rem;
    padding: 0 ${space.sm};
  `;
});
const Session = styled(Row)`
  font-size: 0.7rem;
`;
const Claim = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    font-size: 0.7rem;
    padding: 0 ${space.sm};
  `;
});
const Actions = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.sm};
  `;
});


const LootItem = ({
  item, session, pc,
}) => {
  const [editLootItem, setEditLootItem] = useState(null);

  const toggleEditLootItem = () => {
    setEditLootItem(editLootItem ? null : item);
  };

  const theme = useContext(ThemeContext);
  const { claimedColor, defaultColor, categoryColors } = theme.loot;

  let itemColor = defaultColor;
  let iconName = 'toolbox';

  // Potions
  if (item.category === 'Ix4rXerjbmgn5sX1pYVr') {
    itemColor = categoryColors[0];
    iconName = 'flask';
  }
  // Weapons
  if (item.category === '226lrtAA5GIEvKjtdEpK') {
    itemColor = categoryColors[1];
    iconName = 'fan';
  }
  // Armor
  if (item.category === 'lj5fAPRRka7zECvdN6Hz') {
    itemColor = categoryColors[4];
    iconName = 'shield-alt';
  }
  // Magic Items
  if (item.category === 'NfYCYjXqV2wGKp3zsSwL') {
    itemColor = categoryColors[2];
    iconName = 'magic';
  }
  // Rings
  if (item.category === '9ZymcEvEoKYAMBByMlaE') {
    itemColor = categoryColors[3];
    iconName = 'ring';
  }
  // Scrolls
  if (item.category === 'eDY9NpaLkZMtaUOhWcth') {
    itemColor = categoryColors[5];
    iconName = 'scroll';
  }
  // Claimed
  if (pc) {
    itemColor = claimedColor;
  }

  return (
    <Card noShadow={!!pc} color={itemColor} hoverColor={pc && theme.color.darkgray}>
      {editLootItem && (
        <Modal>
          <EditRecord
            schemaId="loot"
            onCancel={toggleEditLootItem}
            onSaveSuccess={toggleEditLootItem}
            recordData={editLootItem}
          />
        </Modal>
      )}
      <StyledLootItem itemColor={itemColor} claimed={pc ? 1 : 0}>
        <TitleRow itemColor={itemColor} claimed={pc ? 1 : 0} hasLink={item.url ? 1 : 0}>
          <div>
            <Icon name={iconName} />
          </div>
          <Title>
            {item.url ? (
              <Link
                to={item.url}
                external
                blended={!!pc}
                className="itemLink"
              >
                {item.name}
              </Link>
            ) : item.name}
          </Title>
        </TitleRow>
        {item.comments && (
        <Detail>
          {item.comments}
        </Detail>
        )}
        {session && (
        <Session>
          <div>
            <Link to={`/sessions/${session.id}`} blended={!!pc}>
              {`Session ${session.sessionNumber}`}
            </Link>
          </div>
          <div>{item.whereFound}</div>
        </Session>
        )}
        {pc && (
        <Claim>
          Claimed by
          {' '}
          <Link to={`/info/playerCharacters/${pc.id}`} blended={!!pc}>
            {pc.name}
          </Link>
        </Claim>
        )}
        <Actions>
          <Auth level={3}>
            <Button tiny onClick={toggleEditLootItem}>Edit</Button>
          </Auth>
        </Actions>
      </StyledLootItem>
    </Card>
  );
};

LootItem.propTypes = {
  item: shape({}),
  session: shape({}),
  pc: shape({}),
};
LootItem.defaultProps = {
  item: {},
  session: null,
  pc: null,
};

export default LootItem;
