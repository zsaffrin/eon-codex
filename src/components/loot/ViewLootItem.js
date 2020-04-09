import React from 'react';
import { func, string } from 'prop-types';

import { sortBy } from '../../utils/dataUtils';
import { useDocument, useSchemaFields } from '../../hooks/firestoreHooks';
import {
  ButtonRow, Button, H, Link, Loading, Lookup, MenuLookup, Page, VerticalList,
} from '../ui';

const ViewLootItem = ({ close, itemId }) => {
  const [item, itemLoading] = useDocument(`loot/${itemId}`);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields('loot');

  const fieldKeysToInclude = ['name', 'category', 'status', 'claim', 'comments', 'whereFound', 'session'];

  const listRows = schemaFields ? sortBy(schemaFields, 'displayOrder').reduce((acc, field) => {
    const {
      key, name, type, lookup,
    } = field;

    let content = item[key];
    if (type === 'lookup') {
      content = <Lookup collection={lookup} recordId={item[key]} />;
    }
    if (type === 'menu') {
      content = <MenuLookup menu={lookup} itemKey={item[key]} />;
    }
    if (key === 'name' && item.url) {
      content = <Link to={item.url} external>{item.name}</Link>;
    }

    return fieldKeysToInclude.includes(key) ? [
      ...acc,
      {
        label: name,
        content,
      },
    ] : acc;
  }, []) : [];
  listRows.push({
    fullRow: true,
    label: 'actions',
    content: (
      <ButtonRow align="center">
        <Button onClick={close}>Close</Button>
      </ButtonRow>
    ),
  });

  return (
    <Page>
      <H l={1}>Loot Item</H>
      {schemaFieldsLoading || itemLoading ? <Loading /> : (
        <VerticalList items={listRows} />
      )}
    </Page>
  );
};
ViewLootItem.propTypes = {
  close: func,
  itemId: string,
};
ViewLootItem.defaultProps = {
  close: () => {},
  itemId: null,
};

export default ViewLootItem;
