import React, { useEffect, useState } from 'react';
import { bool, func, string } from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { sortBy } from '../../../../utils/dataUtils';
import { useDocument, useFirebase, useSchemaFields } from '../../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, H, Input, Loading, Page, VerticalList,
} from '../../../ui';

const DeleteConfirmation = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.danger};
    font-weight: bold;
    text-align: center;
  `;
});

const EditLootItem = ({ close, add, itemId }) => {
  const { sessionId } = useParams();
  const [item, setItem] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [itemData, itemDataLoading] = useDocument(`loot/${itemId}`);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields('loot');
  const firebase = useFirebase();

  useEffect(() => {
    if (!item) {
      if (add) {
        if (!schemaFieldsLoading && schemaFields) {
          setItem(schemaFields.reduce((acc, field) => {
            const { key, defaultValue } = field;
            return {
              ...acc,
              [key]: key === 'session' ? sessionId : defaultValue,
            };
          }, {}));
        }
      } else if (itemId) {
        if (!itemDataLoading && itemData) {
          setItem(itemData);
        }
      }
    }
  }, [item, add, schemaFieldsLoading, schemaFields, itemId, itemDataLoading, itemData, sessionId]);

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleInputChange = (e) => {
    if (e.isDate) {
      setItem({
        ...item,
        [e.id]: e.value,
      });
    } else if (e.type === 'checkbox') {
      setItem({
        ...item,
        [e.target.id]: e.target.checked,
      });
    } else if (e.isMultiselect) {
      setItem({
        ...item,
        [e.fieldId]: e.value,
      });
    } else if (e.target.type === 'checkbox') {
      setItem({
        ...item,
        [e.target.id]: e.target.checked,
      });
    } else {
      setItem({
        ...item,
        [e.target.id]:
          e.target.type === 'number' ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const addLootItem = async () => {
    try {
      const res = await firebase.addDoc('loot', item);
      if (res.status === 'success') {
        close();
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveLootItem = async () => {
    try {
      const res = await firebase.updateDoc(`loot/${itemId}`, item);
      if (res.status === 'success') {
        close();
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLootItem = async () => {
    try {
      const res = await firebase.deleteDoc(`loot/${itemId}`);
      if (res.status === 'success') {
        close();
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  let actions = (
    <ButtonRow align="center">
      <Button onClick={close}>Close</Button>
    </ButtonRow>
  );
  if (add) {
    actions = (
      <ButtonRow align="center">
        <Button primary onClick={addLootItem}>Add</Button>
        <Button onClick={close}>Cancel</Button>
      </ButtonRow>
    );
  }
  if (itemId) {
    actions = (
      <ButtonRow align="center">
        <Button primary onClick={saveLootItem}>Save Changes</Button>
        <Button onClick={close}>Cancel</Button>
        <Button danger onClick={toggleDeleteMode}>Delete</Button>
      </ButtonRow>
    );
  }
  if (deleteMode) {
    actions = (
      <ButtonRow align="center">
        <Button danger onClick={deleteLootItem}>Yes, Delete</Button>
        <Button onClick={toggleDeleteMode}>No, Cancel</Button>
      </ButtonRow>
    );
  }

  const items = schemaFields && item ? sortBy(schemaFields, 'displayOrder').reduce((acc, field) => {
    const {
      name, type, key, lookup,
    } = field;
    return [
      ...acc,
      {
        label: name,
        content: (
          <Input
            type={type}
            id={key}
            lookup={lookup}
            value={item[key]}
            onChange={handleInputChange}
          />
        ),
      },
    ];
  }, []) : [];
  if (deleteMode) {
    items.push({
      fullRow: true,
      label: 'confirm',
      content: (
        <DeleteConfirmation>
          Delete this item
          <br />
          ARE YOU SURE?
          <br />
          This is permanent and cannot be undone
        </DeleteConfirmation>
      ),
    });
  }
  items.push({
    fullRow: true,
    label: 'actions',
    content: actions,
  });

  return schemaFieldsLoading || !item ? <Loading /> : (
    <Page>
      <H l={1}>{`${add ? 'Add' : 'Edit'} Loot Item`}</H>
      <VerticalList items={items} />
    </Page>
  );
};
EditLootItem.propTypes = {
  close: func,
  add: bool,
  itemId: string,
};
EditLootItem.defaultProps = {
  close: () => {},
  add: false,
  itemId: null,
};

export default EditLootItem;
