import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { useCollection, useSchema } from '../../../hooks/firestoreHooks';
import { sortBy } from '../../../utils/dataUtils';
import {
  Breadcrumb, ButtonRow, Button, Loading, Page, Table,
} from '../../ui';
import EditRecord from './EditRecord';

const ManageCollection = () => {
  const { collectionName } = useParams();
  const location = useLocation();

  const [collection, collectionLoading] = useCollection(
    collectionName,
  );
  const [schema, schemaLoading] = useSchema(collectionName);
  const [fields, fieldsLoading] = useCollection('schemaFields', [
    'schema',
    '==',
    collectionName,
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [sortField, setSortField] = useState('id');
  const history = useHistory();

  useEffect(() => {
    if (
      location.state
      && location.state.sortKey
      && location.state.sortKey !== sortField
    ) {
      setSortField(location.state.sortKey);
    }
  }, [location, sortField]);

  const closeEdit = () => {
    setEditItem(null);
    setEditMode(false);
  };
  const edit = (item) => {
    setEditItem(item);
    setEditMode(true);
  };
  const addNew = () => {
    setEditItem(null);
    setEditMode(true);
  };

  if (editMode) {
    return (
      <EditRecord
        collection={collectionName}
        fields={sortBy(fields, 'order')}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  const columns = fields ? fields.reduce((acc, field) => {
    const { showOnTables, type } = field;
    if (showOnTables) {
      return [
        ...acc,
        {
          ...field,
          align: (
            type === 'boolean'
            || type === 'longtext'
            || type === 'multiselect'
            || type === 'number'
          ) ? 'center' : null,
        },
      ];
    }
    return acc;
  }, []) : [];

  return collectionLoading || schemaLoading || fieldsLoading ? (
    <Loading />
  ) : (
    <Page fullWidth>
      <Breadcrumb
        links={[
          { label: 'Home', target: '/' },
          { label: 'Settings', target: '/settings' },
          { label: 'Collections', target: '/settings/collections' },
        ]}
      />
      <h1>{schema.name}</h1>
      <ButtonRow align="space-between">
        <Button small primary onClick={() => addNew()}>
          New
        </Button>
        <Button small onClick={() => history.push(`/settings/schema/${collectionName}`)}>
          Edit Schema
        </Button>
      </ButtonRow>

      {collection && schema ? (
        <Table
          columns={sortBy(columns, 'order')}
          entries={sortBy(collection, sortField)}
          actions={[
            { label: 'Edit', action: edit },
          ]}
        />
      ) : (
        <div>No data</div>
      )}
    </Page>
  );
};

export default ManageCollection;
