import { useHistory, useParams } from 'react-router-dom';

import { useSchema, useToggle } from '../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, Link, Loading, Modal, Page, TitleRow } from '../../../../../ui';
import AddCollectionRecord from './AddCollectionRecord';
import CollectionRecordsTable from './CollectionRecordsTable';

const Collection = () => {
  const { collectionId } = useParams();
  const [adding, setAdding] = useToggle();
  const [schema, isSchemaLoading] = useSchema(collectionId);
  const history = useHistory();

  if (isSchemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <TitleRow>
        <div>
          <Breadcrumb items={[
            <Link to="/setup">Setup</Link>,
            'Collections'
          ]} />
          <H l={1} compact>{schema.name}</H>
        </div>
        <ButtonRow compact>
          <Button onClick={() => history.push(`/setup/schema/${collectionId}`)}>
            Schema
          </Button>
        </ButtonRow>
      </TitleRow>
      <Box>
        {adding && (
          <Modal>
            <AddCollectionRecord
              close={setAdding}
              schema={schema}
            />
          </Modal>
        )}
        <ButtonRow justify="start" compact>
          <Button onClick={setAdding}>{`New ${schema.recordName}`}</Button>
        </ButtonRow>
        <CollectionRecordsTable collectionId={collectionId} schema={schema} />
      </Box>
    </Page>
  );
};

export default Collection;
