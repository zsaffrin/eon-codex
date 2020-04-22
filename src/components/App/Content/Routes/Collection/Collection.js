import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Loading, Page,
} from '../../../../ui';
import { ViewCollection } from '../../shared';
import { useSchema } from '../../../../../hooks';

const Collection = () => {
  const { collectionId } = useParams();
  const [schema, schemaLoading] = useSchema(collectionId);


  return schemaLoading ? (
    <Page>
      <Loading />
    </Page>
  ) : (
    <Page>
      {schema && schema.exists ? (
        <ViewCollection collectionId={collectionId} />
      ) : 'Collection not found'}
    </Page>
  );
};

export default Collection;
