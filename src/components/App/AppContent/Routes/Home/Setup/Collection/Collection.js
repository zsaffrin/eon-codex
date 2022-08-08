import { useParams, useNavigate } from 'react-router-dom';

import { useSchema } from '../../../../../../../hooks';
import { Button, Loading, Page, PageHeader } from '../../../../../../ui';
import CollectionRecords from './CollectionRecords';

const Collection = () => {
  const { collectionId } = useParams();
  const [schema, schemaLoading] = useSchema(collectionId);
  const navigate = useNavigate();

  if (schemaLoading) {
    return <Loading />;
  }
  
  return (
    <Page>
      <PageHeader
        title={schema.name}
        breadcrumbs={[{
          label: 'Setup',
          target: '/setup',
        },{
          label: 'Collections',
          target: '/setup',
        }]}
        content={(
          <Button small label="Schema" onClick={() => navigate(`/setup/schema/${collectionId}`)} />
        )}
      />
      <CollectionRecords schema={schema} />
    </Page>
  );
};

export default Collection;
