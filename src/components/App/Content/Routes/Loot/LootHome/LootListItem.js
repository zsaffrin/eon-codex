import React, { useState } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { EditRecord } from '../../../shared';
import {
  Auth, Button, Icon, Link, Modal,
} from '../../../../../ui';

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
  const {
    name, comments, whereFound, url,
  } = item;

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
        {url ? <Link to={url} external>{name}</Link> : <div>{name}</div>}
        {comments && <Small>{comments}</Small>}
        <Small>
          <Link to={`/sessions/${session.id}`}>
            {`Session ${session.sessionNumber}`}
          </Link>
        </Small>
        {whereFound && <Small>{whereFound}</Small>}
        {pc && <Small>{`Claimed by ${pc.name}`}</Small>}
      </div>
      <div>
        <Auth level={3}>
          <Button tiny onClick={() => toggleEditLootItem(item)}>
            <Icon name="edit" />
          </Button>
        </Auth>
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