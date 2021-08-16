import { useParams } from 'react-router-dom';

import { useCampaign, useSchema, useToggle } from '../../../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, Link, Loading, Modal, Page } from "../../../../../../../ui";
import AddCollectionRecord from './AddCollectionRecord';
import CollectionRecordsTable from './CollectionRecordsTable';

const Collection = () => {
  const { collectionId } = useParams();
  const [adding, setAdding] = useToggle();
  const campaign = useCampaign();
  const [schema, isSchemaLoading] = useSchema(collectionId);

  if (isSchemaLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <div>
        <Breadcrumb items={[
          <Link to={`/campaign/${campaign.key}/setup`}>Setup</Link>,
          'Collections'
        ]} />
        <H l={1} compact>{schema.name}</H>
      </div>
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
        <CollectionRecordsTable schema={schema} />
      </Box>
    </Page>
  );
};

export default Collection;
