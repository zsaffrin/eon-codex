import { useHistory, useParams } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';

import { useCollection, useSchema } from '../../../../../../hooks';
import { Box, Button, ButtonRow, H, Loading, Page, Table, TitleRow } from '../../../../../ui';

const Collection = () => {
  const { collectionId } = useParams();
  const [schema, isSchemaLoading] = useSchema(collectionId);
  const [collection, isCollectionLoading] = useCollection(collectionId);
  const history = useHistory();

  if (isSchemaLoading) {
    return <Loading />;
  }

  const tableColumns = schema && schema.fields
    ? schema.fields.reduce((acc, { name, key, type, lookup }) => (
      [ ...acc, {
          key, 
          lookup,
          title: name,
          type,
        }
      ]
    ), [])
    : [];
  const tableActions = [
    {
      label: <GoPencil />,
      action: () => {},
      // action: (recordData) => setIsEditing(recordData),
    }
  ];

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
            <Table
              columns={tableColumns}
              entries={collection}
              actions={tableActions}
            />
          )
        }
      </Box>
    </Page>
  );
};

export default Collection;
