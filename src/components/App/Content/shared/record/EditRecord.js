import React, { useEffect, useState } from 'react';
import {
  arrayOf, string, func, shape,
} from 'prop-types';
import styled from 'styled-components';

import { sortBy } from '../../../../../utils';
import { useFirebase, useSchema, useSchemaFields } from '../../../../../hooks';
import {
  ButtonRow, Button, H, Input, Loading, Page, VerticalList,
} from '../../../../ui';

const DeleteConfirmation = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.danger};
    font-weight: bold;
    text-align: center;
  `;
});

const EditRecord = ({
  schemaId, sortKey, imperativeFields, onCancel, onSaveSuccess, onDeleteSuccess, recordData, title,
}) => {
  const [schema, schemaLoading] = useSchema(schemaId);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(schemaId);
  const [record, setRecord] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    if (!record && !schemaLoading && !schemaFieldsLoading && schemaFields) {
      const newRecordData = schemaFields ? schemaFields.reduce((acc, field) => {
        const { key, defaultValue } = field;
        return {
          ...acc,
          [key]: recordData && recordData[key] ? recordData[key] : defaultValue,
        };
      }, {}) : {};
      if (recordData) {
        newRecordData.id = recordData.id;
      }
      setRecord(newRecordData);
    }
  }, [record, schemaLoading, schemaFieldsLoading, schemaFields, recordData]);

  const toggleConfirmDelete = () => (
    setConfirmDelete(!confirmDelete)
  );

  const handleInputUpdate = ({ id, value }) => {
    setRecord({
      ...record,
      [id]: value,
    });
  };

  const saveRecordChanges = async () => {
    let recordToSave = schemaFields.reduce((acc, field) => {
      const { key } = field;
      return {
        ...acc,
        [key]: record[key] || null,
      };
    }, {});
    recordToSave.schema = schemaId;
    if (imperativeFields) {
      recordToSave = imperativeFields.reduce((acc, field) => {
        const { key, value } = field;
        return {
          ...acc,
          [key]: value,
        };
      }, recordToSave);
    }

    try {
      console.info(`Updating doc ${schema.collection}/${record.id}`);
      const res = await firebase.updateDoc(`${schema.collection}/${record.id}`, recordToSave);
      if (res.status === 'success') {
        onSaveSuccess();
      }
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  const deleteRecord = async () => {
    try {
      const res = await firebase.deleteDoc(`${schema.collection}/${record.id}`);
      if (res.status === 'success') {
        if (onDeleteSuccess) {
          onDeleteSuccess();
        } else {
          onSaveSuccess();
        }
      }
      if (res.status === 'error') { console.error(res); }
    } catch (err) { console.error(err); }
  };

  let actions = (
    <ButtonRow align="center">
      <Button primary onClick={saveRecordChanges}>Save Changes</Button>
      <Button onClick={onCancel}>Cancel</Button>
      <Button danger onClick={toggleConfirmDelete}>Delete</Button>
    </ButtonRow>
  );
  if (confirmDelete) {
    actions = (
      <ButtonRow align="center">
        <Button danger onClick={deleteRecord}>Yes, Delete</Button>
        <Button onClick={toggleConfirmDelete}>No, Cancel</Button>
      </ButtonRow>
    );
  }

  const formRows = record ? (
    sortBy(schemaFields, sortKey || 'displayOrder')
      .reduce((acc, field) => {
        const {
          key, lookup, name, type,
        } = field;

        return imperativeFields && imperativeFields.filter((i) => i.key === key).length > 0
          ? acc
          : [
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
  if (confirmDelete) {
    formRows.push({
      fullRow: true,
      label: 'confirmDelete',
      content: (
        <DeleteConfirmation>
          {`Delete this ${schema ? schema.recordName : 'item'}`}
          <br />
          ARE YOU SURE?
          <br />
          This is permanent and cannot be undone
        </DeleteConfirmation>
      ),
    });
  }
  formRows.push({
    fullRow: true,
    label: 'actions',
    content: actions,
  });

  return !record ? <Loading /> : (
    <Page>
      <H l={1}>{title || `Edit ${schema.recordName || `${schema.name} record`}`}</H>
      <VerticalList items={formRows} />
    </Page>
  );
};

EditRecord.propTypes = {
  schemaId: string,
  sortKey: string,
  imperativeFields: arrayOf(shape({
    key: string,
    value: string,
  })),
  onCancel: func,
  onSaveSuccess: func,
  onDeleteSuccess: func,
  recordData: shape({}),
  title: string,
};
EditRecord.defaultProps = {
  schemaId: ' ',
  sortKey: '',
  imperativeFields: null,
  onCancel: null,
  onSaveSuccess: null,
  onDeleteSuccess: null,
  recordData: {},
  title: null,
};

export default EditRecord;
