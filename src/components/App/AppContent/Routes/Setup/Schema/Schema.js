import { useHistory, useParams } from 'react-router-dom';

import { useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Loading, Page, TitleRow } from '../../../../../ui';

const Schema = () => {
  const { schemaId } = useParams();
  const [schema, isSchemaLoading] = useSchema(schemaId);
  const history = useHistory();

  if (isSchemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <TitleRow>
        <H l={1} compact>{schema.name}</H>
        <ButtonRow compact>
          <Button onClick={() => history.push(`/setup/collection/${schemaId}`)}>
            Collection
          </Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        <pre>{JSON.stringify(schema, ' ', 2)}</pre>
      </Box>
    </Page>
  );
};

export default Schema;
