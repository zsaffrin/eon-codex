import { useHistory, useParams } from 'react-router-dom';

import { useCollection, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Loading, Page, TitleRow } from '../../../../../ui';

const Collection = () => {
  const { collectionId } = useParams();
  const [schema, isSchemaLoading] = useSchema(collectionId);
  const [collection, isCollectionLoading] = useCollection(collectionId);
  const history = useHistory();

  if (isSchemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <TitleRow>
        <H l={1} compact>{schema.name}</H>
        <ButtonRow compact>
          <Button onClick={() => history.push(`/setup/schema/${collectionId}`)}>
            Schema
          </Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        {isCollectionLoading
          ? <Loading />
          : (
            <pre>{JSON.stringify(collection, ' ', 2)}</pre>
          )
        }
      </Box>
    </Page>
  );
};

export default Collection;
