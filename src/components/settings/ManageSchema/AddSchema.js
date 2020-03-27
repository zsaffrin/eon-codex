import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFirebase } from '../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, H, Input, Page, VerticalList,
} from '../../ui';

const schemaFields = [
  { key: 'apiKey', name: 'API Key', defaultValue: '' },
  { key: 'name', name: 'Name', defaultValue: '' },
];

const AddSchema = () => {
  const [schema, setSchema] = useState(schemaFields.reduce((acc, field) => {
    const { key, defaultValue } = field;
    return {
      ...acc,
      [key]: defaultValue,
    };
  }, {}));
  const history = useHistory();
  const firebase = useFirebase();

  const handleInputChange = (e) => {
    setSchema({
      ...schema,
      [e.target.id]: e.target.value,
    });
  };

  const addNewSchema = async () => {
    try {
      const res = await firebase.setDoc('schemas', schema.apiKey, schema);
      if (res.status === 'success') {
        history.push('/settings/collections');
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const listItems = schemaFields.reduce((acc, field) => {
    const { key, name } = field;
    return [
      ...acc,
      {
        label: name,
        content: (
          <Input
            id={key}
            value={schema[key]}
            onChange={handleInputChange}
          />
        ),
      },
    ];
  }, []);
  listItems.push({
    fullRow: true,
    label: 'actions',
    content: (
      <ButtonRow align="center">
        <Button primary onClick={addNewSchema}>Add Schema</Button>
        <Button onClick={() => history.push('/settings/collections')}>Cancel</Button>
      </ButtonRow>
    ),
  });

  return (
    <Page>
      <H l={1}>Add New Schema</H>
      <VerticalList items={listItems} />
    </Page>
  );
};

export default AddSchema;
