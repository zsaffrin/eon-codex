import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from '../../../../hooks/authHooks';
import { useCollection, useMenuItems } from '../../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, Loading, Modal,
} from '../../../ui';
import LootCategory from './LootCategory';
import EditLootItem from './EditLootItem';

const StyledLoot = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: repeat(auto-fit, 1fr);
  `;
});

const SessionLoot = () => {
  const { sessionId } = useParams();
  const [user, userLoaded] = useCurrentUser();
  const [addLootItem, setAddLootItem] = useState(false);
  const [itemData, itemDataLoading] = useCollection('loot', [
    'session', '==', sessionId,
  ]);
  const [categoryData, categoryDataLoading] = useMenuItems('lootCategories');

  const toggleAddLootItem = () => (
    addLootItem
      ? setAddLootItem(false)
      : setAddLootItem(true)
  );

  return itemDataLoading || categoryDataLoading ? <Loading /> : (
    <StyledLoot>
      {addLootItem && (
        <Modal close={toggleAddLootItem}>
          <EditLootItem close={toggleAddLootItem} add />
        </Modal>
      )}
      {userLoaded && user && user.canEdit && (
        <ButtonRow align="start">
          <Button small onClick={toggleAddLootItem}>Add Item</Button>
        </ButtonRow>
      )}
      {categoryData && categoryData.reduce((acc, category) => {
        const { itemKey, name } = category;
        const items = itemData ? itemData.filter((item) => item.category === itemKey) : [];
        return items.length > 0 ? [
          ...acc,
          <LootCategory key={itemKey} title={name} items={items} />,
        ] : acc;
      }, [])}
      <LootCategory title="Misc" items={itemData ? itemData.filter((item) => !item.category) : []} />
    </StyledLoot>
  );
};

export default SessionLoot;
