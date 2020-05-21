import React, { useState } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { EditRecord } from '../../../shared';
import { Button, Icon, Modal } from '../../../../../ui';

const StyledItem = styled.li(({ claimed, theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${claimed ? color.accent : color.primary};
    border-radius: 4px;
    padding: ${space.sm};
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${space.sm};
  `;
});
const Small = styled.div`
  font-size: 0.7rem;
`;

const LootListItem = ({ item, session, pc }) => {
  const [editLootItem, setEditLootItem] = useState(null);
  const { name, whereFound } = item;

  const toggleEditLootItem = (i) => {
    setEditLootItem(editLootItem ? null : i);
  };

  return (
    <StyledItem claimed={pc ? 1 : 0}>
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
      <div>
        <div>{name}</div>
        <Small>{`Session ${session.sessionNumber}`}</Small>
        {whereFound && <Small>{whereFound}</Small>}
        {pc && <Small>{`Claimed by ${pc.name}`}</Small>}
      </div>
      <div>
        <Button tiny onClick={() => toggleEditLootItem(item)}>
          <Icon name="edit" />
        </Button>
      </div>
    </StyledItem>
  );
};
LootListItem.propTypes = {
  item: shape({}),
  session: shape({}),
  pc: shape({}),
};
LootListItem.defaultProps = {
  item: {},
  session: {},
  pc: {},
};

export default LootListItem;
