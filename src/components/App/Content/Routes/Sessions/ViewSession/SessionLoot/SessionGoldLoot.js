import React, { useState } from 'react';
import {
  arrayOf, shape, string, number,
} from 'prop-types';
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
const Content = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: 1fr 3fr;
  `;
});
const TotalCell = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    align-content: start;
    justify-content: center;
    padding-bottom: ${space.lg};
  `;
});
const Total = styled.div`
  font-size: 3em;
  font-weight: bold;

  & > span {
    font-size: 0.5em;
    text-transform: uppercase;
  }
`;
const Breakdown = styled.div`
  font-size: 0.8em;
`;
const Split = styled.div`
  & > span {
    font-size: 1.25em;
    font-weight: bold;
  }
`;

const fieldKeysToInclude = ['name', 'value', 'whereFound'];

const SessionGoldLoot = ({
  fields, items, title, shares,
}) => {
  const [editLootItem, setEditLootItem] = useState(null);

  const toggleEditLootItem = (item) => {
    setEditLootItem(editLootItem ? null : item);
  };

  const columns = sortBy(fields, 'displayOrder').filter(({ key }) => fieldKeysToInclude.includes(key));
  const actions = [
    { label: 'Edit', action: toggleEditLootItem, authLevelRequired: 3 },
  ];

  const totalAmount = items.reduce((acc, i) => (
    i.value ? acc + i.value : acc
  ), 0);

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
      <Content>
        <TotalCell>
          <Total>
            {totalAmount}
            <span>gp</span>
          </Total>
          <Breakdown>{`/ ${shares} shares`}</Breakdown>
          <Split>
            =
            {' '}
            <span>{`${+(totalAmount / shares).toFixed(1)} gp`}</span>
            {' '}
            each
          </Split>
        </TotalCell>
        <Table
          columns={columns}
          entries={items}
          actions={actions}
        />
      </Content>
    </StyledCategory>
  );
};
SessionGoldLoot.propTypes = {
  items: arrayOf(shape({})),
  title: string,
  fields: arrayOf(shape({})),
  shares: number,
};
SessionGoldLoot.defaultProps = {
  items: [],
  title: '',
  fields: [],
  shares: 1,
};

export default SessionGoldLoot;
