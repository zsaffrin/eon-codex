import React, { useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import { sortBy } from '../../../../../../../utils';
import { Modal, Table } from '../../../../../../ui';
import { EditRecord } from '../../../../shared';

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

const fieldKeysToInclude = ['name', 'claim', 'comments', 'whereFound'];

const SessionLootCategory = ({ fields, items, title }) => {
  const [editLootItem, setEditLootItem] = useState(null);

  const toggleEditLootItem = (item) => {
    setEditLootItem(editLootItem ? null : item);
  };

  const columns = sortBy(fields, 'displayOrder').filter(({ key }) => fieldKeysToInclude.includes(key));
  const actions = [
    { label: 'Edit', action: toggleEditLootItem, authLevelRequired: 3 },
  ];

  return (
    <StyledCategory>
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
      <TitleBar>{title}</TitleBar>
      <Table
        columns={columns}
        entries={items}
        actions={actions}
      />
    </StyledCategory>
  );
};
SessionLootCategory.propTypes = {
  items: arrayOf(shape({})),
  title: string,
  fields: arrayOf(shape({})),
};
SessionLootCategory.defaultProps = {
  items: [],
  title: '',
  fields: [],
};

export default SessionLootCategory;
