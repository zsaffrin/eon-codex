import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCollection, useSchemaFields } from '../../../../../../../hooks';
import {
  ButtonRow, Button, Loading, Modal,
} from '../../../../../../ui';
import { AddRecord } from '../../../../shared';
import SessionLootCategory from './SessionLootCategory';

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
  const [addLootItem, setAddLootItem] = useState(false);
  const [lootCategories, lootCategoriesLoading] = useCollection('lootCategories');
  const [sessionLootItems, sessionLootItemsLoading] = useCollection('loot', [
    'session', '==', sessionId,
  ]);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields('loot');

  const toggleAddLootItem = () => {
    setAddLootItem(!addLootItem);
  };

  const lootItems = lootCategories ? lootCategories.reduce((acc, cat) => {
    const { id, name } = cat;
    const items = sessionLootItems ? sessionLootItems.filter((item) => item.category === id) : [];
    return items.length > 0 ? [
      ...acc,
      (
        <SessionLootCategory
          key={id}
          items={items}
          title={name}
          fields={schemaFields}
        />
      ),
    ] : acc;
  }, []) : [];
  const miscItems = sessionLootItems ? sessionLootItems.filter((item) => !item.category) : [];
  if (miscItems.length > 0) {
    lootItems.push(
      <SessionLootCategory
        key="none"
        items={miscItems}
        title="Misc"
        fields={schemaFields}
      />,
    );
  }

  return lootCategoriesLoading || sessionLootItemsLoading || schemaFieldsLoading ? <Loading /> : (
    <StyledLoot>
      {addLootItem && (
        <Modal>
          <AddRecord
            schemaId="loot"
            onCancel={toggleAddLootItem}
            onAddSuccess={toggleAddLootItem}
            imperativeFields={[
              { key: 'session', value: sessionId },
            ]}
          />
        </Modal>
      )}
      <ButtonRow align="start">
        <Button small onClick={toggleAddLootItem}>Add Loot Item</Button>
      </ButtonRow>
      {lootItems}
    </StyledLoot>
  );
};

export default SessionLoot;
