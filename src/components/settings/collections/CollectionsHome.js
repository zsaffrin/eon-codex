import React from 'react';
import { useHistory } from 'react-router-dom';

import { useCollection } from '../../../hooks/firestoreHooks';
import {
  Breadcrumb, ButtonRow, Button, Link, Loading, Page,
} from '../../ui';

const CollectionsHome = () => {
  const [schemas, schemasLoading] = useCollection('schemas');
  const history = useHistory();

  return schemasLoading ? <Loading /> : (
    <Page>
      <Breadcrumb
        links={[
          { label: 'Home', target: '/' },
          { label: 'Settings', target: '/settings' },
        ]}
      />
      <h1>Collections</h1>
      <ButtonRow align="left">
        <Button primary small onClick={() => history.push('/settings/collection/new')}>New</Button>
      </ButtonRow>
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
