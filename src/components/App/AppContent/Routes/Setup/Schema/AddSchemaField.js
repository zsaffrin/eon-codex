import { useCollection, useSchema } from "../../../../../../hooks";
import { H, Loading, Page } from "../../../../../ui";
import { AddRecord } from '../../../../../shared';

const AddSchemaField = ({ close, schemaId }) => {
  const [schema, schemaLoading] = useSchema('schemaFields');
  const [collection, collectionLoading] = useCollection('schemaFields', ["schema","==",schemaId]);

  if (schemaLoading || collectionLoading) {
    return <Loading />;
  }
  
  return (
    <Page>
      <H l={1}>Add Schema Field</H>
      <AddRecord
        schema={schema}
        onCancel={close}
        onSuccess={close}
        imperativeFields={[
          {
            id: 'schema',
            value: schemaId,
          },
          {
            id: 'displayOrder',
            value: collection.length + 1,
          }
        ]}
      />
    </Page>
  );
};

export default AddSchemaField;
