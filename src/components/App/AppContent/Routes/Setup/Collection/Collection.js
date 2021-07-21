import { useHistory, useParams } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';

import { useCollection, useSchema } from '../../../../../../hooks';
import { Box, Breadcrumb, Button, ButtonRow, H, Link, Loading, Page, Table, TitleRow } from '../../../../../ui';

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
