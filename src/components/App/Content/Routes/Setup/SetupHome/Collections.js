import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { sortBy } from '../../../../../../utils';
import { useCollection } from '../../../../../../hooks';
import { Link, Loading } from '../../../../../ui';

const Collections = () => {
  const { path } = useRouteMatch();
  const [schemas, schemasLoading] = useCollection('schemas');

  return schemasLoading ? <Loading /> : (
    <div>
      <ul>
        {sortBy(schemas, 'name').map(({ id, name }) => (
          <li key={id}>
            <Link to={`${path}/collection/${id}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collections;
