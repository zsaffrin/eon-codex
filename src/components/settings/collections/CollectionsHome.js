import React from 'react';

import { useCollection } from '../../../hooks/firestoreHooks';
import {
  Breadcrumb, Link, Loading, Page,
} from '../../ui';

const CollectionsHome = () => {
  const [schemas, schemasLoading] = useCollection('schemas');

  return schemasLoading ? <Loading /> : (
    <Page>
      <Breadcrumb
        links={[
          { label: 'Home', target: '/' },
          { label: 'Settings', target: '/settings' },
        ]}
      />
      <h1>Collections</h1>
      <ul>
        {schemas.map(({ id, name }) => (
          <li key={id}>
            <Link
              to={`/settings/collection/${id}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default CollectionsHome;
