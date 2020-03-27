import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useDocument, useFirebase, useSchema } from '../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, H, Input, Loading, Page, VerticalList,
} from '../../ui';

const DeleteWarning = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    color: ${color.danger};
    font-weight: bold;
    padding: ${space.lg} 0;
    text-align: center;
  `;
});

const schemaFieldFields = [
  { key: 'key', name: 'Key', defaultValue: '' },
  { key: 'name', name: 'Name', defaultValue: '' },
  {
    key: 'type', name: 'Type', type: 'menu', lookup: 'fieldTypes', defaultValue: '',
  },
  { key: 'lookup', name: 'Lookup', defaultValue: '' },
  {
    key: 'showAsBoolean', name: 'Show As Boolean', type: 'boolean', defaultValue: false,
  },
  {
    key: 'showOnTables', name: 'Show On Tables', type: 'boolean', defaultValue: true,
  },
];

const EditSchemaField = () => {
  const [schemaField, setSchemaField] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const { collectionName, schemaFieldId } = useParams();
  const [add] = useState(schemaFieldId === 'add');
  const [schema, schemaLoading] = useSchema(collectionName);
  const [fieldData, fieldDataLoading] = useDocument(`schemaFields/${schemaFieldId}`);
  const history = useHistory();
  const firebase = useFirebase();

  useEffect(() => {
    if (!schemaField) {
      if (add) {
        setSchemaField(schemaFieldFields.reduce((acc, field) => {
          const { key, defaultValue } = field;
          return ({
            ...acc,
            [key]: defaultValue,
          });
        }, {}));
      } else if (!fieldDataLoading && fieldData) {
        setSchemaField(fieldData);
      }
    }
  }, [add, fieldDataLoading, fieldData, schemaField]);

  const handleInputChange = (e) => {
    let newSchemaField = { ...schemaField };

    if (e.target.id === 'type') {
      let defaultValue = '';
      if (e.target.value === 'boolean') {
        defaultValue = false;
      }
      if (e.target.value === 'number') {
        defaultValue = 0;
      }

      newSchemaField = {
        ...newSchemaField,
        defaultValue,
      };
    }

    if (e.isDate) {
      newSchemaField = {
        ...newSchemaField,
        [e.id]: e.value,
      };
    } else if (e.type === 'checkbox') {
      newSchemaField = {
        ...newSchemaField,
        [e.target.id]: e.target.checked,
      };
    } else if (e.isMultiselect) {
      newSchemaField = {
        ...newSchemaField,
        [e.fieldId]: e.value,
      };
    } else if (e.target.type === 'number') {
      newSchemaField = {
        ...newSchemaField,
        [e.target.id]: Number(e.target.value),
      };
    } else {
      newSchemaField = {
        ...newSchemaField,
        [e.target.id]: e.target.value,
      };
    }

    setSchemaField(newSchemaField);
  };

  const addNewSchemaField = async () => {
    if (schemaField.name.trim().length < 1) {
      console.error('Need a name');
    } else {
      try {
        const res = await firebase.addDoc('schemaFields', {
          ...schemaField,
          schema: collectionName,
        });
        if (res.status === 'success') {
          history.push(`/settings/schema/${collectionName}`);
        }
        if (res.status === 'error') {
          console.error(res);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const saveSchemaFieldData = async () => {
    const { id, ...rest } = schemaField;
    try {
      const res = await firebase.updateDoc(`schemaFields/${schemaFieldId}`, rest);
      if (res.status === 'success') {
        history.push(`/settings/schema/${collectionName}`);
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecord = async () => {
    try {
      const res = await firebase.deleteDoc(`schemaFields/${schemaFieldId}`);
      if (res.status === 'success') {
        history.push(`/settings/schema/${collectionName}`);
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const listItems = schemaField ? schemaFieldFields.reduce((acc, field) => {
    const {
      name, key, type, lookup,
    } = field;

    return [
      ...acc,
      {
        label: name,
        content: (
          <Input
            id={key}
            type={type}
            lookup={lookup}
            value={schemaField[key]}
            onChange={handleInputChange}
          />
        ),
      },
    ];
  }, []) : [];

  let actionsBar = (
    <ButtonRow align="center">
      <Button primary onClick={saveSchemaFieldData}>Save Changes</Button>
      <Button onClick={() => history.push(`/settings/schema/${collectionName}`)}>Cancel</Button>
      <Button danger onClick={() => setDeleteMode(true)}>Delete</Button>
    </ButtonRow>
  );
  if (add) {
    actionsBar = (
      <ButtonRow align="center">
        <Button primary onClick={addNewSchemaField}>Add New Schema Field</Button>
        <Button onClick={() => history.push(`/settings/schema/${collectionName}`)}>Cancel</Button>
      </ButtonRow>
    );
  }
  if (deleteMode) {
    actionsBar = (
      <>
        <DeleteWarning>
          DELETE THIS SCHEMA FIELD
          <br />
          Are you sure?
          <br />
          Please be sure before you click Yes
        </DeleteWarning>
        <ButtonRow align="center">
          <Button danger onClick={deleteRecord}>Yes, Delete</Button>
          <Button onClick={() => setDeleteMode(false)}>No, Cancel</Button>
        </ButtonRow>
      </>
    );
  }

  return fieldDataLoading || schemaLoading ? <Loading /> : (
    <Page>
      <H l={1}>{schema.name}</H>
      <H l={2}>{`${add ? 'Add' : 'Edit'} Schema Field`}</H>
      <VerticalList items={listItems} />
      {actionsBar}
    </Page>
  );
};

export default EditSchemaField;
