import React, { useEffect, useState } from 'react';
import { bool } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import {
  useDocument, useFirebase, useSchema, useSchemaFields,
} from '../../../hooks/firestoreHooks';
import { sortBy } from '../../../utils/dataUtils';
import {
  Button, ButtonRow, H, Input, Loading, Page, VerticalList,
} from '../../ui';

const EditRecord = ({ addNew }) => {
  const { categoryId, recordId } = useParams();
  const [schema, schemaLoading] = useSchema(categoryId);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields(schema ? schema.id : ' ');
  const [recordData, recordDataLoading] = useDocument(`${categoryId}/${recordId}`);
  const [record, setRecord] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const history = useHistory();
  const firebase = useFirebase();

  useEffect(() => {
    if (addNew && !schemaLoading && schema && !schemaFieldsLoading && schemaFields && !record) {
      setRecord(schemaFields.reduce((acc, field) => {
        let defaultValue = '';
        if (field.type === 'checkbox') { defaultValue = false; }

        return ({
          ...acc,
          [field.key]: defaultValue,
        });
      }, {}));
    }
  }, [addNew, schemaLoading, schema, schemaFieldsLoading, schemaFields, record]);

  useEffect(() => {
    if (!addNew && !recordDataLoading && recordData && !record) {
      setRecord(recordData);
    }
  }, [addNew, recordDataLoading, recordData, record]);

  const handleInputChange = (e) => {
    if (e.isDate) {
      setRecord({
        ...record,
        [e.id]: e.value,
      });
    } else if (e.type === 'checkbox') {
      setRecord({
        ...record,
        [e.target.id]: e.target.checked,
      });
    } else if (e.isMultiselect) {
      setRecord({
        ...record,
        [e.fieldId]: e.value,
      });
    } else {
      setRecord({
        ...record,
        [e.target.id]:
          e.target.type === 'number' ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const addNewRecord = async () => {
    if (record.name.trim().length < 1) {
      console.error('Need a name');
    } else {
      try {
        const res = await firebase.addDoc(categoryId, {
          ...record,
          created: new Date(),
          modified: new Date(),
        });
        if (res.status === 'success') {
          history.push(`/info/${categoryId}/${res.result.id}`);
        }
        if (res.status === 'error') {
          console.error(res);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const saveRecordChanges = async () => {
    try {
      const res = await firebase.updateDoc(`${categoryId}/${record.id}`, {
        ...record,
        modified: new Date(),
      });
      if (res.status === 'success') {
        history.push(`/info/${categoryId}/${record.id}`);
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
      const res = await firebase.deleteDoc(`${categoryId}/${record.id}`);
      if (res.status === 'success') {
        history.push(`/info/${categoryId}`);
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formItems = schemaFieldsLoading || !record ? [] : sortBy(schemaFields, 'order').reduce((acc, field) => {
    const {
      key, name, type, lookup,
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
            value={record[key]}
            onChange={handleInputChange}
          />
        ),
      },
    ];
  }, []);

  let actions = (
    <ButtonRow align="center">
      <Button primary onClick={saveRecordChanges}>Save Changes</Button>
      <Button onClick={() => history.push(`/info/${categoryId}/${recordId}`)}>Cancel</Button>
      <Button danger onClick={() => setDeleteMode(true)}>Delete</Button>
    </ButtonRow>
  );
  if (addNew) {
    actions = (
      <ButtonRow align="center">
        <Button primary onClick={addNewRecord}>Add Record</Button>
        <Button onClick={() => history.push(`/info/${categoryId}`)}>Cancel</Button>
      </ButtonRow>
    );
  }
  if (deleteMode) {
    actions = (
      <>
        <div>
          Delete this record?
          <br />
          This is permanent. Are you sure?
        </div>
        <ButtonRow align="center">
          <Button danger onClick={deleteRecord}>Yes, Delete</Button>
          <Button onClick={() => setDeleteMode(false)}>Nope, cancel</Button>
        </ButtonRow>
      </>
    );
  }

  return schemaLoading || schemaFieldsLoading || recordDataLoading || !record ? <Loading /> : (
    <Page>
      <H l={1}>
        {`${schema.name}: ${addNew ? 'New Record' : 'Edit Record'}`}
      </H>
      <VerticalList items={formItems} />
      {actions}
    </Page>
  );
};
EditRecord.propTypes = {
  addNew: bool,
};
EditRecord.defaultProps = {
  addNew: false,
};

export default EditRecord;
