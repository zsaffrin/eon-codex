import React, { useState } from 'react';
import { shape } from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCollection, useSchemaFields } from '../../../../../../../hooks';
import {
  Auth, ButtonRow, Button, Loading, Modal,
} from '../../../../../../ui';
import { AddRecord } from '../../../../shared';
import SessionLootCategories from './SessionLootCategories';

const StyledLoot = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: repeat(auto-fit, 1fr);
  `;
});

const SessionLoot = ({ participants }) => {
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
        <Auth level={3}>
          <Button small onClick={toggleAddLootItem}>Add Loot Item</Button>
        </Auth>
      </ButtonRow>

      {sessionLootItems.length > 0 ? (
        <SessionLootCategories
          lootItemData={sessionLootItems}
          lootCategoryData={lootCategories}
          schemaFields={schemaFields}
          participants={Object.keys(participants).length}
        />
      ) : (
        <div>No loot items</div>
      )}

    </StyledLoot>
  );
};
SessionLoot.propTypes = {
  participants: shape({}),
};
SessionLoot.defaultProps = {
  participants: {},
};

export default SessionLoot;
