import React, { useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import { useCurrentUser } from '../../../../hooks/authHooks';
import {
  Link, Lookup, Modal, Table,
} from '../../../ui';
import EditLootItem from './EditLootItem';

const StyledCategory = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    border: 1px solid ${color.primary};
    border-radius: 4px;
    padding: ${space.sm};
  `;
});
const TitleBar = styled.div`
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

const LootCategory = ({ title, items }) => {
  const [user, userLoaded] = useCurrentUser();
  const [editLootItem, setEditLootItem] = useState(null);

  const columns = [
    { key: 'name', name: 'Item', nowrap: true },
    { key: 'claim', name: 'Claim', nowrap: true },
    { key: 'comments', name: 'Comment' },
    { key: 'whereFound', name: 'Where Found' },
  ];

  const entries = items ? items.reduce((acc, item) => {
    const { claim, name, url } = item;

    return [
      ...acc,
      {
        ...item,
        claim: claim ? <Lookup collection="playerCharacters" recordId={claim} /> : null,
        name: url ? (
          <Link external to={url}>{name}</Link>
        ) : name,
      },
    ];
  }, []) : [];

  const toggleEditLootItem = (item) => (
    editLootItem
      ? setEditLootItem(null)
      : setEditLootItem(item.id)
  );

  const actions = userLoaded && user && user.canEdit ? [
    { label: 'Edit', action: toggleEditLootItem },
  ] : null;

  return (
    <StyledCategory>
      {editLootItem && (
        <Modal close={toggleEditLootItem}>
          <EditLootItem close={toggleEditLootItem} itemId={editLootItem} />
        </Modal>
      )}
      <TitleBar>{title}</TitleBar>
      <Table columns={columns} entries={entries} actions={actions} orderKey="name" />
    </StyledCategory>
  );
};
LootCategory.propTypes = {
  items: arrayOf(shape({})),
  title: string,
};
LootCategory.defaultProps = {
  items: [],
  title: '',
};

export default LootCategory;
