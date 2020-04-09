import React, { useState } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '../../hooks/authHooks';
import {
  H, Icon, Modal, Table,
} from '../ui';
import EditLootItem from './EditLootItem';
import ViewLootItem from './ViewLootItem';

const StyledSection = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${color.secondary};
    border-radius: 4px;
    padding: ${space.md};
  `;
});

const LootListSection = ({ title, items }) => {
  const [viewLootItem, setViewLootItem] = useState(null);
  const [editLootItem, setEditLootItem] = useState(null);
  const [user, userLoaded] = useCurrentUser();

  const toggleViewLootItem = (item) => (
    viewLootItem
      ? setViewLootItem(null)
      : setViewLootItem(item.id)
  );
  const toggleEditLootItem = (item) => (
    editLootItem
      ? setEditLootItem(null)
      : setEditLootItem(item.id)
  );

  const columns = [
    { key: 'name', name: 'Item' },
    {
      key: 'session',
      name: 'Session',
      type: 'lookup',
      lookup: 'sessions',
      lookupArg: 'sessionNumber',
    },
  ];
  const entries = items;
  const actions = [
    { label: <Icon name="info-circle" />, action: toggleViewLootItem },
  ];
  if (userLoaded && user && user.canEdit) {
    actions.push({ label: 'Edit', action: toggleEditLootItem });
  }

  return (
    <StyledSection>
      {viewLootItem && (
        <Modal close={toggleViewLootItem}>
          <ViewLootItem close={toggleViewLootItem} itemId={viewLootItem} />
        </Modal>
      )}
      {editLootItem && (
        <Modal close={toggleEditLootItem}>
          <EditLootItem close={toggleEditLootItem} itemId={editLootItem} />
        </Modal>
      )}
      <H l={3}>{title}</H>
      <Table columns={columns} entries={entries} actions={actions} />
    </StyledSection>
  );
};

export default LootListSection;
