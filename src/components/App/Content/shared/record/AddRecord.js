import React, { useState } from 'react';
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types';

import { sortBy } from '../../../../../utils';
import { useFirebase, useSchema, useSchemaFields } from '../../../../../hooks';
import {
  ButtonRow, Button, H, Input, Loading, Page, VerticalList,
} from '../../../../ui';

const AddRecord = ({
  schemaId, sortKey, onCancel, onAddSuccess, imperativeFields, specifyId, title,
}) => {
  const [schema, schemaLoading] = useSchema(schemaId);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(schemaId);
  const [record, setRecord] = useState(schemaFields ? schemaFields.reduce((acc, field) => {
    const { key, defaultValue } = field;
    return {
      ...acc,
      [key]: defaultValue,
    };
  }, {}) : {});
  const [newRecordId, setNewRecordId] = useState('');
  const firebase = useFirebase();

  const handleInputUpdate = ({ id, value }) => {
    setRecord({
      ...record,
      [id]: value,
    });
  };

  const addNewRecord = async () => {
    const recordToAdd = imperativeFields ? imperativeFields.reduce((acc, field) => {
      const { key, value } = field;
      return {
        ...acc,
        [key]: value,
      };
    }, record) : record;

    try {
      const res = specifyId
        ? await firebase.setDoc(schemaId, newRecordId, recordToAdd)
        : await firebase.addDoc(schemaId, recordToAdd);
      if (res.status === 'success') {
        onAddSuccess();
      }
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  const formRows = schemaFields ? (
    sortBy(schemaFields, sortKey || 'displayOrder')
      .reduce((acc, field) => {
        const {
          key, lookup, name, type,
        } = field;

        return imperativeFields.filter((i) => i.key === key).length > 0 ? acc : [
          ...acc,
          {
            label: name,
            content: (
              <Input
                id={key}
                type={type}
                lookup={lookup}
                value={record[key]}
                onChange={handleInputUpdate}
              />
            ),
          },
        ];
      }, [])
  ) : [];
  formRows.push({
    fullRow: true,
    label: 'actions',
    content: (
      <ButtonRow align="center">
        <Button primary onClick={addNewRecord}>
          {schema ? (
            `Add ${schema.recordName || `${schema.name} Record`}`
          ) : 'Add Record'}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonRow>
    ),
  });
  if (specifyId) {
    formRows.unshift({
      label: 'ID',
      content: (
        <Input
          id="id"
          type="FeJHQhhXaYb8A3ngJ8hG"
          value={newRecordId}
          onChange={({ value }) => setNewRecordId(value)}
        />
      ),
    });
  }

  return schemaLoading || schemaFieldsLoading ? <Loading /> : (
    <Page>
      <H l={1}>{title || `New ${schema.recordName || `${schema.name} Record`}`}</H>
      <VerticalList items={formRows} />
    </Page>
  );
};

AddRecord.propTypes = {
  schemaId: string.isRequired,
  onCancel: func,
  onAddSuccess: func,
  sortKey: string,
  imperativeFields: arrayOf(shape({
    key: string,
    value: string,
  })),
  specifyId: bool,
  title: string,
};
AddRecord.defaultProps = {
  onCancel: () => {},
  onAddSuccess: () => {},
  sortKey: null,
  imperativeFields: null,
  specifyId: false,
  title: null,
};

export default AddRecord;
